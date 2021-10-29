import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? (
      <>
        <div>Something went wrong</div>
        <a href="'/takeoff-staff-test/">Home Page</a>
      </>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
