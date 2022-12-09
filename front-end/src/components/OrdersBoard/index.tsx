import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles"

interface OrdersBoardProps {
	icon: String;
	title: String;
	orders: Order[];
}

export function OrdersBoard ({icon, title, orders }: OrdersBoardProps){

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedOrder, setselectedOrder]   = useState<null | Order>(null)

	function handleOpenModal(order: Order){
		setIsModalVisible(true)
		setselectedOrder(order)
	}

	function handleCloseModal(){
		setIsModalVisible(false)
		setselectedOrder(null)
	}

	return (
		<Board>
			<OrderModal
				visible={isModalVisible}
				order={selectedOrder}
				onClose={handleCloseModal}
			/>

			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			{/* if (orders > 0 ) renderiza o OrdersContainer : não faça nd */}
			{orders.length > 0 && (
				<OrdersContainer>
					{orders.map(order =>(
						<button
							key={order._id}
							onClick={() => handleOpenModal(order)}
						>
							<strong>Mesa {order.table}</strong>
							<span>{order.products.length} itens</span>
						</button>
					))}
				</OrdersContainer>
			)}
		</Board>
	)
}