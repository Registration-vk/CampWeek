"use client"
import { Icon } from '../Icon/Icon';
import styles from './Navbar.module.scss';
import BirdIcon from './assets/Bird.svg';
import ProfileIcon from './assets/profile.svg';
import MeetingsIcon from './assets/meetings.svg';
import MeetingCreateIcon from './assets/createMeeting.svg';
import menuProfileIcon from './assets/menuProfile.svg';
import menuLogOut from './assets/menuLogOut.svg';
import Link from 'next/link';
import { ROUTES } from '@/core/routes';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown } from '../Dropdown/ui/Dropdown';
import { useUserId } from '@/app/context/context';
import Cookies from "js-cookie";

export const Navbar = () => {
	const { setUserId, isLoading, isAuth, setIsAuth } = useUserId();
	const currentPathname = usePathname();
	const router = useRouter();	
	const onLogout = () => {
		router.push(`/`);
		setUserId(null);
		setIsAuth(false);
		localStorage.removeItem("token");
		Cookies.remove("access_token");
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.navbarLogo}>
				<Icon Svg={BirdIcon}></Icon>
				<Link href={ROUTES.application.path} className={styles.link}>Неделя вожатства</Link>
			</div>
			<div className={styles.navbarMeetings}>
				<div className={styles.navbarMeeting}>
					<Icon Svg={MeetingsIcon} className={currentPathname === ROUTES.application.path ? styles.activePath : styles.path}></Icon>
					<Link 
						href={ROUTES.application.path} 
						className={currentPathname === ROUTES.application.path ? styles.activePath : styles.path}
					>
						Мероприятия
					</Link>
				</div>
				<div className={styles.navbarMeetingCreate}>
					<Icon Svg={MeetingCreateIcon} className={currentPathname === ROUTES.application.meetingCreate.path ? styles.activePath : styles.path}></Icon>
					<Link 
						href={ROUTES.application.meetingCreate.path} 
						className={currentPathname === ROUTES.application.meetingCreate.path ? styles.activePath : styles.path}
					>
						Создать мероприятие
					</Link>
				</div>
			</div>
			<div className={styles.profileIcon}>
				<Dropdown 
					trigger={<Icon Svg={ProfileIcon} className={styles.profileIcon}/>}
					items={[
						{
							content: (
								<>
									<Icon Svg={menuProfileIcon}/>
									<p>Личный кабинет</p>
								</>
							),
							href: '/account',
						},
						{
							content: (
								<>
									<Icon Svg={menuLogOut}/>
									<p>Выход</p>
								</>
							),
							onClick: onLogout,
						},
					]}
				/>
			</div>		
		</div>
	);
};