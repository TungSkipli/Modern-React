const UserListSkeleton = () => {
    return (
        <div className="bg-white border border-gray-300 rounded overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-300">
                    <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase w-12"></th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">ID</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Name</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Email</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Phone</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                        <tr key={index} className="animate-pulse">
                            <td className="px-4 py-3">
                                <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="h-4 bg-gray-200 rounded w-28 mx-auto"></div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex gap-2 justify-center">
                                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserListSkeleton;
