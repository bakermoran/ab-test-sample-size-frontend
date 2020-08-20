import React from 'react';

function LossValueExplainer() {
    return (
        <div>
            <h1>Loss Value</h1>
            Loss value represents the relative percent (expected value) of decreasing the baseline metric if we stop the test and end up making the wrong decision.
            Loss Tolerance means the smallest amount we are willing to lose off of the baseline if we pick the wrong variant.
            We can trade a higher expected loss for faster speed in running a test.
        </div>
    )
}

export default LossValueExplainer;
