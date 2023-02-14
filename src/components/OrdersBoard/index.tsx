import { toast } from "react-toastify";

import { useState } from "react";
import { Order } from "../../types/Orders";
import { api } from "../../utils/api";
import { OrderModal } from "../OrderModal";
import { Board, OrderContainer } from "./style";

interface OrderBoardProps {
	icon: string;
	title: string;
	orders: Order[];
	onCancelOrder: (orderId: string) => void;
	onOrderStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrderBoardProps) {

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedOrder, setSelectedOrder]   = useState<null | Order>(null)
	const [isLoading, setIsLoading]           = useState(false)

	function handleOpenModal(order: Order) {
		setIsModalVisible(true)
		setSelectedOrder(order)
	}

	function handleCloseModal() {
		setIsModalVisible(false)
		setSelectedOrder(null)
	}

	async function handleChangeOrderStatus(){
		setIsLoading(true)

		const status = selectedOrder?.status == `WAITING` ? 'IN_PRODUCTION' : 'DONE'

		await api.patch(`orders/${selectedOrder?._id}`, {status})

		toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`)
		onOrderStatusChange(selectedOrder!._id, status)
		setIsLoading(false)
		setIsModalVisible(false)
	}

	async function handleCancelOrder(){
		setIsLoading(true)
		api.delete(`orders/${selectedOrder?._id}`)

		//delete order
		onCancelOrder(selectedOrder!._id)

		toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`)
		setIsLoading(false)
		setIsModalVisible(false)
	}

	return (
		<Board>

			<OrderModal
				visible={isModalVisible}
				order={selectedOrder}
				onClose={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				isLoading={isLoading}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>

			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			{orders.length > 0 && (
				<OrderContainer>
					{orders.map((order) => (
						<button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
							<strong>Mesa {order.table}</strong>
							<span>{order.products.length} itens</span>
						</button>
					))}
				</OrderContainer>
			)}
		</Board>
	);
}
