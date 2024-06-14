import logo from './Avengers_logo.png';
import avengers from './Avengers.png';
import './ComicsHeader.css';
export const ComicsHeader = () => {
    return (
        <div className='comics__header'>
            <img src={avengers} alt="avenger" className="comics__aven" />
            <p className='comics_text'>New comics every week!
            <br />
            Stay tuned!</p>
            <img src={logo} alt="" className="comics__logo" />
        </div>
    )
}