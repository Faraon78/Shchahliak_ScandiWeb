import React from 'react';
import AttributeItemText from '../attributeText-item/attributeText-item.component';
import './attribute-panel.style.css';

class AttributePanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributeSet: props.attributeSet || props.item.items[0].displayValue,
    };
  }
  setAttributes = (displayValue) => {
    this.setState({ attributeSet: displayValue });
    this.props.setAttributesToCart(this.props.item.name, displayValue);
  };
  setColor = (displayValue) => {
    this.setState({ attributeSet: displayValue });
    this.props.setAttributesToCart(this.props.item.name, displayValue);
  };

  render() {
    const { item, isChange } = this.props;
    let attributeItem;
    if (item.type === 'text') {
      attributeItem = item.items.map((attr) => (
        <AttributeItemText
          className={
            attr.displayValue === this.state.attributeSet
              ? 'attribute-item__text attribute-text__selected'
              : 'attribute-item__text'
          }
          key={attr.value}
          setAttribute={isChange ? this.setAttributes : undefined}
          isChange={isChange}
          attr={attr}
        />
      ));
    }
    if (item.type === 'swatch') {
      attributeItem = item.items.map((attr) => (
        <div
          className={
            attr.displayValue === this.state.attributeSet
              ? 'attribute-item__colorbox attribute-colorbox__selected'
              : 'attribute-item__colorbox'
          }
          key={attr.displayValue}
          onClick={
            isChange ? (e) => this.setColor(attr.displayValue, e) : undefined
          }
        >
          <div
            className="attribute-item__swatch"
            style={{ backgroundColor: `${attr.value}` }}
          />
        </div>
      ));
    }

    return (
      <>
        <h5 className="attribute-title">{item.name}:</h5>
        <div className="attribute-items">{attributeItem}</div>
      </>
    );
  }
}

export default AttributePanel;
