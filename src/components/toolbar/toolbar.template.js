function toButton(btn) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(btn.value)}'
    `;
  return `
    <div 
    class="button ${btn.active ? 'active' : ''}"
    ${meta}
    >
        <i 
        class="material-icons"
        ${meta}
        >${btn.icon}</i>
    </div>`;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold' ? true: false,
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},

    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic' ? true : false,
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
    },
    {
      icon: 'format_underlined',
      active: state['textDecoration'] === 'underline' ? true: false,
      value: {
        textDecoration: state['textDecoration'] === 'underline' ?
      'none' :
      'underline',
      },
    },
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: {textAlign: 'left'},
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: {textAlign: 'center'},
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: {textAlign: 'right'},
    },
  ];

  return buttons.map(toButton).join('');
}
