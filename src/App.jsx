import Main from './components/Main';
import Aside from './components/Aside';
import closeIcon from './assets/close-icon.png';
import useCustom from './hooks/useCustom';

export default function App() {
	const {
		close,
		count,
		minCount,
		tenzies,
		dice,
		startNewGame,
		holdDice,
		roll,
		time,
		bestTime,
	} = useCustom();

	return (
		<>
			<img
				className='close-icon'
				onClick={close}
				src={closeIcon}
				alt='close icon'
			/>
			<Aside>
				<section key={crypto.randomUUID()} className='section'>
					<h1 className='aside__title'>Rolls</h1>
					<h2>{count}</h2>
				</section>

				<section key={crypto.randomUUID()} className='section section2'>
					<h1 className='aside__title'>Best # of rolls</h1>
					<h2>{minCount}</h2>
				</section>
			</Aside>

			<Main
				tenzies={tenzies}
				dice={dice}
				startNewGame={startNewGame}
				holdDice={holdDice}
				roll={roll}
			/>

			<Aside>
				<section key={crypto.randomUUID()} className='section '>
					<h1 className='aside__title'>Time</h1>
					<h2>
						<span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
						<span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
						<span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
					</h2>
				</section>

				<section key={crypto.randomUUID()} className='section section2'>
					<h1 className='aside__title'>Best time</h1>
					<h2>
						<span>{('0' + Math.floor((bestTime / 60000) % 60)).slice(-2)}</span>
						:
						<span>{('0' + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
						<span>{('0' + ((bestTime / 10) % 100)).slice(-2)}</span>
					</h2>
				</section>
			</Aside>
		</>
	);
}
