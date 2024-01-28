import { AiOutlineUser } from 'react-icons/ai'

export default function UserList({ users }) {

    const userMap = new Map();

    const filteredUsers = users.filter((user) => {
        const alreadyExists = userMap.has(user.userId);
        if (!alreadyExists) {
            userMap.set(user.userId, true);
        }
        return !alreadyExists;
    });

    return (
        <div className='container user'>
            <h2>Users</h2>
            <ul className='list user'>
                {filteredUsers.map(({ userId, userName }) => (
                    <li key={userId} className='item user'>
                        <AiOutlineUser className='icon user' />
                        {userName}
                    </li>
                ))}
            </ul>
        </div>
    )
}
