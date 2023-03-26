import { Product } from "@medusajs/medusa"
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon"
import { ActionType } from "../../../../../components/molecules/actionables"
import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import MetadataModal from "./metadata-modal"
import JSONView from "../../../../../components/molecules/json-view"

type Props = {
	product: Product
}

const MetadataSection = ({ product }: Props) => {
	const { state, toggle, close } = useToggleState()

	const actions: ActionType[] = [
		{
			label: "Edit Metadata",
			onClick: toggle,
			icon: <EditIcon size={20} />,
		},
	]

	return (
		<>
			<Section title="Metadata" actions={actions} forceDropdown>
				<div className="mt-large flex flex-col gap-y-base">
					<h3 className="inter-base-semibold">Metadata</h3>
					<div>
						<JSONView data={product.metadata || {}} />
					</div>
				</div>
			</Section>

			<MetadataModal onClose={close} open={state} product={product}/>
		</>
	)
}

export default MetadataSection
