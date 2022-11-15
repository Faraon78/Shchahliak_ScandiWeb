import React from 'react';

class AttributeItemText extends React.PureComponent {
  cbSetAttribute = () => {
    this.props.setAttribute(this.props.attr.displayValue);
  };

  render() {
    const { attr, className, isChange } = this.props;
    const adaptClassName =
      attr.value.length > 3 ? `${className} wide-title` : `${className}`;

    return (
      <div
        className={adaptClassName}
        onClick={isChange ? this.cbSetAttribute : undefined}
      >
        <div
          className={
            attr.value.length > 3
              ? 'item-text__box wide-title'
              : 'item-text__box'
          }
        >
          {attr.value}
        </div>
      </div>
    );
  }
}

export default AttributeItemText;
