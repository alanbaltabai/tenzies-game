import { useState, useEffect } from 'react';

export default function useCustom() {
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

	return {
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
	};
}
