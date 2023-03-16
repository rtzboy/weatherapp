import { useEffect, useRef, useState } from 'react';

const useShowSearchBox = () => {
	const [isVisible, setIsVisible] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleIsVisible = (evt: MouseEvent) => {
		if (!wrapperRef.current?.contains(evt.target as Node)) setIsVisible(false);
	};

	useEffect(() => {
		if (!isVisible) return;
		document.addEventListener('click', handleIsVisible);
		return () => document.removeEventListener('click', handleIsVisible);
	}, [isVisible]);

	return { wrapperRef, isVisible, setIsVisible };
};

export default useShowSearchBox;
