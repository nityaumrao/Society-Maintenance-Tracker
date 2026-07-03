import { SignupRequestBody } from '@/lib/types/types'
import { findUserByEmail } from '@/lib/queries/users/select'
import { createUser } from '@/lib/queries/users/insert'
import { UserAlreadyExistsError } from './error'
import {
    hashPassword,
    isUniqueViolationError,
    normalizeSignupPayload,
    toPublicUser,
} from './utils'
import { generateVerificationToken } from './token'
import { sendVerificationEmail } from './mail'

export const userServices = async (payload: SignupRequestBody) => {
    const normalizedPayload = normalizeSignupPayload(payload)
    const existingUser = await findUserByEmail(normalizedPayload.email)

    if (existingUser) {
        throw new UserAlreadyExistsError(normalizedPayload.email)
    }

    const hashedPassword = await hashPassword(normalizedPayload.password)

    let newUser
    const fullName = [normalizedPayload.firstName, normalizedPayload.lastName]
        .map((value) => value.trim())
        .filter(Boolean)
        .join(' ')
        .trim()

    try {
        newUser = await createUser({
            name: fullName.length ? fullName : normalizedPayload.email,
            email: normalizedPayload.email,
            password: hashedPassword,
        })
    } catch (error) {
        if (isUniqueViolationError(error)) {
            throw new UserAlreadyExistsError(normalizedPayload.email)
        }
        throw error
    }

    // Directly return success without verification email
    return {
        user: toPublicUser(newUser),
        message: 'Account created successfully. You can now log in.',
        emailSent: true,
    }
}
