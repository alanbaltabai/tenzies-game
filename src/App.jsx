import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import Die from './components/Die';
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
			id: nanoid(),
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
	const diceElements = dice.map((item) => (
		<Die
			key={item.id}
			value={item.value}
			isHeld={item.isHeld}
			holdDice={() => holdDice(item.id)}
		/>
	));
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
			<aside className='aside'>
				<section key={nanoid()} className='section'>
					<h1 className='aside__title'>Rolls</h1>
					<h2>{count}</h2>
				</section>

				<section key={nanoid()} className='section section2'>
					<h1 className='aside__title'>Best # of rolls</h1>
					<h2>{minCount}</h2>
				</section>
			</aside>

			<main className='main'>
				<h1 className='title'>Tenzies</h1>

				<p className='instructions'>
					{tenzies
						? `You won!`
						: `Click a die to hold its value. Roll until all dice are same.`}
				</p>

				<div className='dies'>{diceElements}</div>

				{tenzies ? (
					<button className='button' onClick={startNewGame}>
						New Game
					</button>
				) : (
					<button className='button' onClick={roll}>
						Roll
					</button>
				)}

				{tenzies && <Confetti width='560' height='560' />}
			</main>

			<aside className='aside'>
				<section key={nanoid()} className='section '>
					<h1 className='aside__title'>Time</h1>
					<h2>
						<span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
						<span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
						<span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
					</h2>
				</section>

				<section key={nanoid()} className='section section2'>
					<h1 className='aside__title'>Best time</h1>
					<h2>
						<span>{('0' + Math.floor((bestTime / 60000) % 60)).slice(-2)}</span>
						:
						<span>{('0' + Math.floor((bestTime / 1000) % 60)).slice(-2)}:</span>
						<span>{('0' + ((bestTime / 10) % 100)).slice(-2)}</span>
					</h2>
				</section>
			</aside>
		</>
	);
}
