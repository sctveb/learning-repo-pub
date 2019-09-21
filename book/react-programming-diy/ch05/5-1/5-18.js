let hooks = null;

export function useHook() {
    hooks.push(hookData);
}

function process_a_component_rendering(component) {
    hooks = [];
    component();
    let hooksForThisComponent = hooks;
    hooks = null;
}