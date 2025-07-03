import type { FormItemBaseType } from "./common"
import type { Upload } from "@arco-design/web-vue"

export interface FormUploadType extends FormItemBaseType {
	type: 'upload'
	accept?: string
	action?: string
	multiple?: boolean
	directory?: boolean
	draggable?: boolean
	tip?: string
	headers?: Record<string, string>
	data?: Record<string, any>
	name?: string | ((file: any) => string)
	withCredentials?: boolean
	customRequest?: (options: any) => void
	limit?: number
	autoUpload?: boolean
	showFileList?: boolean
	showRemoveButton?: boolean
	showRetryButton?: boolean
	showCancelButton?: boolean
	showUploadButton?: boolean
	showPreviewButton?: boolean
	download?: boolean
	showLink?: boolean
	imageLoading?: 'eager' | 'lazy'
	listType?: 'text' | 'picture' | 'picture-card'
	responseUrlKey?: string | ((FileItem: any) => string)
	imagePreview?: boolean
	onBeforeUpload?: Upload['onBeforeUpload']
	onBeforeRemove?: Upload['onBeforeRemove']
	onButtonClick?: Upload['onButtonClick']
}