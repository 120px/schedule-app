import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useCurrentGroup } from '../../../provider/CurrentGroupProvider';

interface AuthGroupProps {
	children: React.ReactNode;
}

const AuthGroup: React.FC<AuthGroupProps> = ({ children }) => {
	const { currentGroup } = useCurrentGroup();
	const [isMember, setIsMember] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkMembership = async () => {
			setLoading(true);
			if (currentGroup?.id && auth.currentUser) {
				const groupRef = doc(db, "groups", currentGroup.id);
				const groupSnap = await getDoc(groupRef);
				const groupData = groupSnap.data();
				if (groupData && Array.isArray(groupData.members)) {
					setIsMember(groupData.members.includes(auth.currentUser.uid));
				} else {
					setIsMember(false);
				}
			} else {
				setIsMember(false);
			}
			setLoading(false);
		};
		checkMembership();
	}, [currentGroup]);

	if (loading) {
		return <div className="p-8 w-full">Loading...</div>;
	}

	if (isMember === false) {
		return (
			<div className="p-8 w-full text-center text-red-600 font-bold">
				Access Denied: You are not a member of this group.
			</div>
		);
	}

	return <>{children}</>;
};

export default AuthGroup;
