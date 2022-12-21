export default function Die(props) {
	return (
		<div className={props.isHeld ? 'die-held' : 'die'} onClick={props.holdDice}>
			<h1>{props.value}</h1>
		</div>
	);
}
