import React from 'react'
import '../Styles/ProductGrid.styles.css'

class ProductGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: 3,
            gap: 10,
        }
    }

    shouldComponentUpdate() {
      return false;
    }

    render() {
        const columnWrapper = []
        const result = []

        for(let i = 0; i < this.props.columns; i++)
            columnWrapper[`column${i}`] = []

        if(this.props.children instanceof Array) {
            for(let i = 0; i < this.props.children.length; i++) {
                const colIndex = i % this.props.columns
                columnWrapper[`column${colIndex}`].push(
                    <div style={{
                      marginBottom: `${this.props.gap}px`
                    }} key={i}>
                        {this.props.children[i]}
                    </div>
                )
            }
        }

        for (let i = 0; i < this.props.columns; i++) {
          result.push(
            <div
              style={{
                marginLeft: `${i > 0 ? this.props.gap : 0}px`,
                flex: 1,
              }}
              key = {i}
            >
              {columnWrapper[`column${i}`]}
            </div>
          );
        }
        
        return <div style={{ display: "flex" }}>{result}</div>;
    }
}

export default ProductGrid