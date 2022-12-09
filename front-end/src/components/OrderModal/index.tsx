import { useEffect }                                  from "react";
import closeIcon                                      from "../../assets/images/close-icon.svg";
import { Order }                                      from "../../types/Order";
import { formatCurrency }                             from "../../utils/formatCurrency";
import { Overlay, ModalBody, OrdersDetails, Actions } from "./styles";

interface OrderModalProps {
	visible: boolean;
	order  : Order | null;
	onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: OrderModalProps) {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	if (!visible || !order) return null;

	// let total = 0
	// order.products.forEach(({product, quantity}) => {
	// 	total += product.price * quantity
	// })

	const total = order.products.reduce((total, { product, quantity }) => {
		return total + product.price * quantity;
	}, 0);

	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>Mesa {order.table}</strong>

					<button onClick={onClose}>
						<img src={closeIcon} alt="CLOSE" />
					</button>
				</header>

				<div className="status-container">
					<small>Status do pedido</small>
					<div>
						<span>
							{order.status === "WATTING" && "🕒"}
							{order.status === "IN_PRODUCTION" && "👩‍🍳"}
							{order.status === "DONE" && "✅"}
						</span>

						<strong>
							{order.status === "WATTING" && "Fila de espera"}
							{order.status === "IN_PRODUCTION" && "Em preparação"}
							{order.status === "DONE" && "Pronto!"}
						</strong>
					</div>
				</div>

				<OrdersDetails>
					<strong>Itens</strong>

					<div className="order-items">
						{order.products.map(({ _id, product, quantity }) => (
							<div className="item" key={_id}>
								<img
									src={`http://localhost:3001/uploads/1670276873921-quatro-queijos.png`}
									alt={`Product Image ${product.name}`}
									width="56"
									height="28.51"
								/>

								<span className="quantity">{quantity}x</span>

								<div className="product-details">
									<strong>{product.name}</strong>
									<span>{formatCurrency(product.price)}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</OrdersDetails>

				<Actions>
					<button className="primary">
						<span>👩‍🍳</span>
						<strong>Iniciar Produção</strong>
					</button>

					<button className="secondary">
						<strong>Cancelar Pedido</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}
