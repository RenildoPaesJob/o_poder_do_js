import styled from "styled-components";

export const Overlay = styled.div`
	left: 0px;
	top: 0px;
	background: rgba(0, 0, 0,0.8);
	backdrop-filter: blur(4.5px);
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalBody = styled.div`
	background: #fff;
	width: 30rem;
	padding: 2rem;
	border-radius: 0.5rem;

	header{
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong{
			font-size: 1.5rem;
		}

		button{
			border: 0;
			background: transparent;
			line-height: 0;
		}
	}

	.status_container{
		margin-top: 2rem;

		small {
			font-size: 1rem;
			opacity: 0.8;
		}

		div {
			margin-top: 0.5rem;
			display: flex;
			align-items: center;
			gap: 8px;

			span{
				font-size: 1.5rem;
				background: rgba(0, 0, 0,0.2);
				border-radius: 10px;
				align-items: center;
				justify-content: center;
			}

			strong {
				font-size: 1.5rem;
			}
		}
	}
`;

export const OrderDetails = styled.div`
	margin-top: 2rem;

	> strong {
		font-weight: 500;
		font-size: 1rem;
		opacity: 0.8;
	}

	.order_items{
		margin-top: 1rem;

		.item {
			display: flex;

			& + .item {
				margin-top: 1rem;
			}

			img{
				border-radius: 6px;
			}

			.quantity {
				font-size: 0.875rem;
				color: #666;
				display: block;
				min-width: 1.25rem;
				margin-left: 0.75rem;
			}

			.product_details {
				margin-left: 4px;
				strong{
					display: block;
					margin-bottom: 4px;
				}

				span{
					font-size: 0.875rem;
					color: #666;
				}
			}
		}
	}

	.total{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 14px;

		span{
			font-weight: 500;
			font-size: 14px;
			opacity: 0.8;
		}
	}
`;

export const Actions = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2rem;

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.primary {
		background: #333;
		border-radius: 2.5rem;
		border: 0;
		color: #fff;
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.secondary {
		padding: 12px 24px;
		color: #D73035;
		justify-content: center;
		border: 0;
		background-color: transparent;
		margin-top: 12px;
	}
`;