import React from 'react';

function LossValueExplainer() {
    return (
        <div>
            <h1>Loss Value</h1>
            <p>
                Loss value represents the relative percent (expected value) of decreasing the baseline metric if we stop the test and end up making the wrong decision.
                If the control is actually better than the variant, but we choose the variant based on the results of the test, we can limit the magnitude that we decrease the conversion rate by.
            </p>
            <p>
                Loss Tolerance means the smallest amount we are willing to lose off of the baseline if we pick the wrong variant.
                A loss value of 0.2% (0.002) means that we are willing to call the test when we are sure that if the variant is wrong, we will sacrifice no more than 0.2% relative off of the baseline conversion rate in order to make the call and stop the test.
                We can trade a higher expected loss for faster speed in running a test.
            </p>
        </div>
    )
}

export default LossValueExplainer;
