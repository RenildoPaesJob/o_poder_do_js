import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../Button";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./style";

interface OrderCorfirmModalProps {
	visible: boolean
	onOk: () => void
}

export function OrderCorfirmModal({visible, onOk}: OrderCorfirmModalProps) {

	return (
		<Modal
			visible={visible}
			animationType="fade"
		>
			<StatusBar style="light"/>

			<Container>
				<CheckCircle />
				<Text
					color="#fff"
					size={24}
					weight="600"
					style={{ marginTop: 12 }}
				>
					Pedido confimado
				</Text>
				<Text
					color="#fff"
					opacity={0.9}
					style={{ marginTop: 8 }}
				>
					O pedido entrou na fila de producao!
				</Text>

				<OkButton onPress={onOk}>
					<Text color="#d73035" weight="600">
						OK
					</Text>
				</OkButton>
			</Container>
		</Modal>
	)
}