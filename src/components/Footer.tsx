import LinkIcon from './icons/LinkIcon';
import Facebook from './icons/socialmedia/Facebook';
import Github from './icons/socialmedia/Github';
import Instagram from './icons/socialmedia/Instagram';
import Linkedin from './icons/socialmedia/Linkedin';

const Footer = () => {
	return (
		<footer className='flex flex-col items-center justify-evenly gap-4 bg-[#001A35] py-4 font-inter tracking-wide text-white sm:flex-row sm:gap-2'>
			<div className='flex flex-col items-center gap-2'>
				<span>Weather data provided by OpenWeather</span>
				<div className='flex flex-col items-center gap-2 sm:flex-row'>
					<span>For more information visit: </span>
					<a
						href='https://openweathermap.org/'
						target='_blank'
						rel='noreferrer'
						className='group flex items-center gap-1 italic transition-all hover:text-sky-200'
					>
						<span className='group-hover:animate-pulse'>
							<LinkIcon className='h-5' />
						</span>
						<span>OpenWeatherMap.org</span>
					</a>
				</div>
				<div>
					<img src='./Picture1.png' alt='' className='w-48' />
				</div>
			</div>
			<div className='flex flex-col items-center gap-4'>
				<div>
					<span>Made by </span>
					<span className='italic'>Jhoseph Poma </span>
					<span>JPDev</span>
				</div>
				<ul className='flex justify-center gap-8'>
					{SOCIAL_LINKS.map(link => (
						<li key={link.id} className='animate-pulse hover:animate-none'>
							<a href={link.link} target='_blank' rel='noreferrer'>
								{link.icon}
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};

const SOCIAL_LINKS = [
	{
		id: 1,
		name: 'Facebook',
		link: 'https://www.facebook.com/joseph.22.12/',
		icon: <Facebook className='h-7' />
	},
	{
		id: 2,
		name: 'Instagram',
		link: 'https://www.instagram.com/jhoseph2212/',
		icon: <Instagram className='h-7' />
	},
	{
		id: 3,
		name: 'LinkedIn',
		link: 'https://www.linkedin.com/in/jhoseph-poma-aldave-9b01a01a9/',
		icon: <Linkedin className='h-7' />
	},
	{
		id: 4,
		name: 'Github',
		link: 'https://github.com/rtzboy',
		icon: <Github className='h-7' />
	}
];

export default Footer;
