import { Product } from "@medusajs/medusa"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import { countries } from "../../../../../utils/countries"
import { nestedForm } from "../../../../../utils/nested-form"
import CustomsForm, { CustomsFormType } from "../../../components/customs-form"
import DimensionsForm, {
	DimensionsFormType,
} from "../../../components/dimensions-form"
import Metadata, { MetadataField } from "../../../../../components/organisms/metadata"
import useEditProductActions from "../../hooks/use-edit-product-actions"

type Props = {
	product: Product
	open: boolean
	onClose: () => void
}

type MetadataForm = {
	metadata: Record<string, unknown> | undefined
}

const MetadataModal = ({ product, open, onClose }: Props) => {
	const { onUpdate, updating } = useEditProductActions(product.id)
	const form = useForm<MetadataForm>()
	const [metadata, setMetadata] = useState<MetadataField[]>([])

	const {
		handleSubmit,
	} = form

	useEffect(() => {
		if (product.metadata && metadata.length <= 0) {
			Object.entries(product.metadata).map(([key, value]) => {
				if (typeof value === "string") {
					const newMeta = metadata
					newMeta.push({ key, value })
					setMetadata(newMeta)
				}
			})
		}
	}, [product])

	const onSubmit = handleSubmit(() => {
		onUpdate(
			{
				metadata: metadata.reduce((acc, next) => {
					return {
						...acc,
						[next.key]: next.value,
					}
				}, {}),
			},
			onClose
		)
	})

	return (
		<Modal open={open} handleClose={onClose} isLargeModal>
			<Modal.Body>
				<Modal.Header handleClose={onClose}>
					<h1 className="inter-xlarge-semibold m-0">Edit Attributes</h1>
				</Modal.Header>
				<form onSubmit={onSubmit}>
					<Modal.Content>
						<div className="mt-xlarge w-full">
							<Metadata setMetadata={setMetadata} metadata={metadata} />
						</div>
					</Modal.Content>
					<Modal.Footer>
						<div className="flex items-center justify-end w-full gap-x-xsmall">
							<Button
								variant="secondary"
								size="small"
								type="button"
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="small"
								loading={updating}
							>
								Save
							</Button>
						</div>
					</Modal.Footer>
				</form>
			</Modal.Body>
		</Modal>
	)
}

export default MetadataModal
