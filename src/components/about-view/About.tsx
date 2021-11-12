import './About.scss'
import mint from '../../assets/mint-favicon.png'

const About = () => {
    return (
        <div className="about-container">
            <ul>
                {[1, 2, 3, 4, 5, 6].map(item => {
                    return (
                        <li key={item}>
                            <img src={mint} alt="Option" />
                            <p>This collection is made by me and for fun</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default About
