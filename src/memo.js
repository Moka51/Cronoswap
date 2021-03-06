import {
    createElement
} from 'preact';
import {
    shallowDiffers,
    assign
} from './util';

/**
 * Memoize a component, so that it only updates when the props actually have
 * changed. This was previously known as `React.pure`.
 * @param {import('./internal').FunctionalComponent} c functional component
 * @param {(prev: object, next: object) => boolean} [comparer] Custom equality function
 * @returns {import('./internal').FunctionalComponent}
 */
export function memo(c, comparer) {
    function shouldUpdate(nextProps) {
        let ref = this.props.ref;
        let updateRef = ref == nextProps.ref;
        if (!updateRef && ref) {
            ref.call ? ref(null) : (ref.current = null);
        }

        if (!comparer) {
            return shallowDiffers(this.props, nextProps);
        }

        return !comparer(this.props, nextProps) || !updateRef;
    }

    function Memoed(props) {
        this.shouldComponentUpdate = shouldUpdate;
        return createElement(c, assign({}, props));
    }
    Memoed.prototype.isReactComponent = true;
    Memoed.displayName = 'Memo(' + (c.displayName || c.name) + ')';
    Memoed._forwarded = true;
    return Memoed;
}