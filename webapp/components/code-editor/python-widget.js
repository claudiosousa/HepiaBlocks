import BlocklyDesigner from '../blockly-designer/index.js';
import { downloadFile } from '../tools/file-tools.js';

class PythonWidget extends HTMLElement {
    connectedCallback() {
        this.appendChild($('<pre class="prettyprint">')[0]);
        this.root = this.firstChild;
        this.setBlockly(BlocklyDesigner.instance);
    }

    setBlockly(blockly) {
        this.blockly = blockly;
        this.blockly.addChangeListener(code => this.displayCode(code));
    }

    displayCode() {
        this.root.innerHTML = PR.prettyPrintOne(
            this.blockly.getPythonCode(),
            'py',
            true
        );
    }

    download() {
        downloadFile('MAIN.PY', this.blockly.getPythonCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;