import type { FormItemBaseType } from "./common";

export interface FormSliderType extends FormItemBaseType {
    type: 'slider'
    min?: number
    max?: number
    step?: number
    marks?: Record<number, string>
    direction?: 'horizontal' | 'vertical'
    showTicks?: boolean
    showInput?: boolean
    range?: boolean
    showTooltip?: boolean
}