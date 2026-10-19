import { Component } from 'react'

export default class ProductErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <p role="alert">
          Products could not be loaded. Please refresh the page and try again.
        </p>
      )
    }

    return this.props.children
  }
}