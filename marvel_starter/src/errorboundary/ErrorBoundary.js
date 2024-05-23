import { Component } from "react";
import ErrorMessage from "../components/error/Error";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    // static getDerivedStateFromError() {
    //     return {hasError: true}
    // }
    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        })
    }
    render() {
        const {hasError} = this.state;
        if (hasError) {
            return <ErrorMessage />
        }
        return this.props.children;
    }
}
export default ErrorBoundary;