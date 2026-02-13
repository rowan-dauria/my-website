---
title: 'Transformer Notes'
date: '2026-02-13'
---

## Residual Networks

- FCNNs and CNNs pass the output of layer $n-1$ to layer $n$.
- This could look like the equations below, wher the output of one layer is a parameter for the next.
$$
\begin{aligned}
\mathbf{h}_1 &= \mathbf{f}_1[\mathbf{x}, \phi_1] \\
\mathbf{h}_2 &= \mathbf{f}_2[\mathbf{h}_1, \phi_2] \\
\mathbf{h}_3 &= \mathbf{f}_3[\mathbf{h}_2, \phi_3] \\
\mathbf{y} &= \mathbf{f}_4[\mathbf{h}_3, \phi_4]
\end{aligned}
$$

* This works... up to a point, adding more sequential layers improved CNN performance between AlexNet and VGG (8 to 19 layers).
  * But beyond this, performance began to decrease.
  * We aren't sure exactly why, but the leading hypothesis is that the loss lanscape becomes extremely sensitive to tiny changes in early layers, because a small change is propagated through so many layers to have a large impact on the output. We call this **shattered gradients**.
  * Because the loss is erratic, it causes the weights to update irratically too, a vicious cycle of instability!

### Residual Connections (or Skip Connections)
* One way to over come this is residual connections. Where the input of each layer is summed with the output of each layer.

$$
\begin{aligned}
\mathbf{h}_1 &= \mathbf{x}+\mathbf{f}_1[\mathbf{x}, \phi_1] \\
\mathbf{h}_2 &= \mathbf{h}_1+\mathbf{f}_2[\mathbf{h}_1, \phi_2] \\
\mathbf{h}_3 &= \mathbf{h}_2+\mathbf{f}_3[\mathbf{h}_2, \phi_3] \\
\mathbf{y} &= \mathbf{h}_3+\mathbf{f}_4[\mathbf{h}_3, \phi_4]
\end{aligned}
$$

* Let's re-write the expression for $\mathbf{h}_2$ and $\mathbf{h}_3$
$$
\mathbf{h}_2 = \mathbf{h}_1+\mathbf{f}_2[\mathbf{h}_1, \phi_2] = \mathbf{x}+\mathbf{f}_1[\mathbf{x}, \phi_1] + \mathbf{f}_2[\mathbf{h}_1, \phi_2] \\
\mathbf{h}_3 = \mathbf{h}_2+\mathbf{f}_3[\mathbf{h}_2, \phi_3] = \mathbf{x}+\mathbf{f}_1[\mathbf{x}, \phi_1] + \mathbf{f}_2[\mathbf{h}_1, \phi_2] + \mathbf{f}_3[\mathbf{h}_2, \phi_3]
$$

![Residual connection diagram](/residual-connection.svg)

* From this, we can see see that the **input of each layer is the sum of the outputs** of the previous layers!

#### Order of Operations in Residual Blocks

* ReLU activation is usually done *after* the linear transformation. This means the output is always non-negative.

* In a residual network, this means the inputs for deeper layers will keep increasing, because you're always adding non-negative values.

* To avoid this, we switch the order of operation and perform activation **before** linear transformation.

$$
\begin{aligned}
\mathbf{h}_k = \mathbf{h}_{k-1} + \mathbf{W}_k  a[\mathbf{h}_{k-1}] + \mathbf{b}_k
\end{aligned}
$$

* This has the added benefit of causing the output of each layer to be linear, so backpropagation of gradients is much smoother, and encourages better parameter updates in training.

![Diagram showing order of operations](/order-of-ops.svg)

* Residual networkcs can roughly double the depth of our network before they stop being effective. How can we increase the depth further? Batch normalisation!

### Batch Normalisation

* Although residual networks don't have the same problems with exploding gradients (tiny changes in early network parameters having large effects on training). They do suffer from an **exponential increase in activation variance** at successive layers.

* By normalizing the inputs to each layer, we can train even deeper networks. We calculate the mean and standard deviation of a batch $\mathcal{B}$:

$$
\begin{aligned}
m_h &= \frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} h_i \\
s_h &= \sqrt{\frac{1}{|\mathcal{B}|} \sum_{i \in \mathcal{B}} (h_i - m_h)^2}
\end{aligned}
$$

* The inputs are then normalized:
$$ \hat{h}_i = \frac{h_i - m_h}{s_h + \epsilon} $$

* Finally, we apply a **learnable** scaling ($\gamma$) and shifting ($\delta$):
$$ h_i \leftarrow \gamma \hat{h}_i + \delta, \forall i \in \mathcal{B} $$

* This ensures that the inputs to each layer have a mean of 0 and a variance of 1. This has the advantages:
  * Stable forward passes
  * Enables higher learning rates
  * Is a form or regularisation (changing network parameters according to noisy batch statistics).

## Self-Attention
