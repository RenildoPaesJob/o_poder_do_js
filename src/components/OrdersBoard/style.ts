import styled from "styled-components"

export const Board = styled.div`
	padding: 1rem;
	/* border: 1px solid rgba(244, 244, 244, 0.8); */
	border: 0.063rem solid #d73035;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;

	> header {
		padding: 0.5rem;
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`

export const OrderContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 1.5rem;

	button {
		background: #FFF;
		border: 1px solid #c6c9d1;
		height: 8rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 4px;
		gap: 4px;

		strong {
			font-weight: 500;
		}

		span {
			font-size: 14px;
			color: #666;
		}

		& + button {
			margin-top: 1.5rem;
		}
	}
`