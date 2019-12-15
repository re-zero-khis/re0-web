'use strict';

var ACTION_TYPES = require('./TYPES');

/**
 * Find all components matching a descriptor
 * @param {List<ComponentDescriptor>} state
 * @param {String} matching.role
 */
function findMatchingComponents(state, matching) {
    return state.filter(function (_ref) {
        var descriptor = _ref.descriptor;

        if (matching.role && matching.role !== descriptor.role) {
            return false;
        }

        return true;
    }).map(function (component) {
        return component.Component;
    });
}

/**
 * Register a new component
 * @param  {React.Class} Component
 * @param  {Descriptor} descriptor
 * @return {Action}
 */
function registerComponent(Component, descriptor) {
    return {
        type: ACTION_TYPES.REGISTER_COMPONENT,
        Component: Component,
        descriptor: descriptor
    };
}

module.exports = {
    findMatchingComponents: findMatchingComponents,
    registerComponent: registerComponent
};