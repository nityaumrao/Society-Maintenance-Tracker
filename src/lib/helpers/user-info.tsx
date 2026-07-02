import { ExtendedUser } from '@/next-auth'

interface UserInfoProps {
    user?: ExtendedUser
    label: string
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, label }) => {
    return (
        <div>
            <div>
                <strong>Email:</strong> {user ? user.email : 'Guest'}
            </div>
            <div className="mt-2">
                <div className="flex justify-between">
                    <strong>ID:</strong> {user ? user.id : 'Guest'}
                </div>
                <div className="flex justify-between">
                    <strong>Name:</strong> {user ? user.name : 'Guest'}
                </div>
                <div className="flex justify-between">
                    <strong>Role:</strong> {user ? user.role : 'Guest'}
                </div>
                <div className="flex justify-between">
                    <strong>Image:</strong>{' '}
                    {user ? (
                        <img
                            src={user.image || ''}
                            alt={user.name || 'User Image'}
                        />
                    ) : (
                        'Guest'
                    )}
                </div>
                <div className="flex justify-between">
                    <strong>Two Factor Authentication:</strong>{' '}
                    {user
                        ? user.twoFactorEnabled
                            ? 'Enabled'
                            : 'Disabled'
                        : 'Guest'}
                </div>
            </div>
        </div>
    )
}
