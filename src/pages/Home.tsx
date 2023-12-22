import { useNavigate } from 'react-router-dom'

import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import '../styles/auth.scss'

export function Home() {
	const navigate = useNavigate()

	const handleCreateRoom = () => {
		const provider = googleProvider
		signInWithPopup(auth, provider)
			.then(result => {
				navigate("/new-room", { replace: true })
			})
	}

	return (
		<div id='page-atuh'>
			<aside>
				<img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
				<strong>Crie salas de Q&amp;A ao vivo</strong>
				<p>Tire as dúvidas da sua audiência em tempo-real</p>
			</aside>
			<main>
				<div className='main-content'>
					<img src={logoImg} alt="Letmeask" />
					<button className='create-room' onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Icon Google" />
						Crie sua sala com o Google
					</button>

					<div className='separator'>ou entre em uma sala</div>

					<form>
						<input
							type="text"
							placeholder='Digite o código da sala'
						/>
						<Button type='submit'>Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	)
}