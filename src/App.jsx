import { useState, useEffect } from 'react';

import Main from './components/Main';
import Aside from './components/Aside';
import closeIcon from './assets/close-icon.png';

export default function App() {
	function allNewDice() {
		let arrayOfDiceObjects = [];
		for (let i = 0; i < 10; i++) {
			arrayOfDiceObjects.push(generateNewDie());
		}

		return arrayOfDiceObjects;
	}

	function generateNewDie() {
		return {
			value: Math.floor(Math.random() * (6 - 1 + 1) + 1),
			isHeld: false,
			id: crypto.randomUUID(),
		};
	}

	function startNewGame() {
		setTenzies(false);
		setDice(allNewDice());
		setCount(0);
		setTime(0);
	}

	function finishGame() {
		setTimerOn(false);
		setTenzies(true);
		if (minCount === 0 || count < minCount) setMinCount(count);
		if (bestTime === 0 || time < bestTime) setBestTime(time);
	}

	function close() {
		setTimerOn(false);
		setDice(allNewDice());
		setCount(0);
		setTime(0);
	}

	function roll() {
		setTimerOn(true);
		setCount((count) => count + 1);

		let die;
		setDice((prevDice) =>
			prevDice.map((item) => {
				if (item.isHeld) return item;
				else {
					while (true) {
						die = generateNewDie();
						if (die.value !== item.value) break;
					}
					return die;
				}
			})
		);
	}

	function holdDice(id) {
		setTimerOn(true);

		setDice((prevDice) =>
			prevDice.map((item) =>
				item.id === id ? { ...item, isHeld: !item.isHeld } : item
			)
		);
	}

	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [count, setCount] = useState(0);
	const [minCount, setMinCount] = useState(0);
	const [time, setTime] = useState(0);
	const [bestTime, setBestTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);

	useEffect(() => {
		const isAllHeld = dice.every((die) => die.isHeld);
		const isAllSame = dice.every(
			(die, i, array) => die.value === array[0].value
		);

		if (isAllHeld && isAllSame) {
			finishGame();
		}
	}, [dice]);

	useEffect(() => {
		let interval;

		timerOn
			? (interval = setInterval(() => setTime((prevTime) => prevTime + 10), 10))
			: clearInterval(interval);

		return () => clearInterval(interval);
	}, [timerOn]);

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
