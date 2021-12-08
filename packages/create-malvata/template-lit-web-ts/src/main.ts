import { html, css, LitElement,render } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import XyDialog from 'xy-ui/components/xy-dialog'
(window as any).XyDialog = XyDialog
import XyMessage from 'xy-ui/components/xy-message';
(window as any).XyMessage = XyMessage;
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('e-main')
export class EMain extends LitElement {
  static styles = css`
    :host {
      display: block;
      width:100%;
      height:100%;
      background-color:#f1f1f7
    }
    div{
      height:100%;
      width:100%;
    }
  `
  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'
  
  constructor() {
    super();
   
  }
  firstUpdated(){
    
  }
  render() {
   
    return html`
      <div>${this.name}</div>>
    `
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'e-main': EMain
  }
}
