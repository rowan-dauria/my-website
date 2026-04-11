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

## Self Attention

### Image vs Text Processing

* Residual networks were first introduced for image classification tasks (He et al., 2016). But we are interested in their role for text processing.

* CNNs use parameter sharing to reduce the dimensionality of their input. In a CNN, parameter sharing is the kernel that slides across the input, because the *parameters of the kernel don't change* depending on what part of the input they are processing.

* The added difficulty with text processing is that text inputs can vary in size, and their is no easy way to resize them.

### Dot-product Self Attention

* Dot-product self-attention gives us parameter sharing, in addition to **relations between words**.

* The input of a self-attention block is $N$ inputs of dim $D \times 1$.
   A **value** $\mathbf{v}_m$ is computed for each input $\mathbf{x}_m$:
  $$
  \mathbf{v}_m = \boldsymbol{\beta}_v + \boldsymbol{\Omega}_v \mathbf{x}_m
  $$
  where $\boldsymbol{\beta}_v \in \mathbb{R}^{D \times 1}$ and $\boldsymbol{\Omega}_v \in \mathbb{R}^{D \times D}$ represent biases and weights, respectively.

* The $n^{th}$ output $\mathbf{sa}_n[\mathbf{x}_1, \dots, \mathbf{x}_N]$ is a weighted sum of all the values $\mathbf{v}_1, \dots, \mathbf{v}_N$:
  $$
  \mathbf{sa}_n[\mathbf{x}_1, \dots, \mathbf{x}_N] = \sum_{m=1}^N a[\mathbf{x}_m, \mathbf{x}_n] \mathbf{v}_m
  $$

* The scalar weight $a[\mathbf{x}_m, \mathbf{x}_n]$ is the **attention** that the $n^{th}$ output pays to input $\mathbf{x}_m$.
* The $N$ weights $a[\bullet, \mathbf{x}_n]$ are non-negative and sum to one. Hence, the self-attention of the $n^{th}$ input can be thought of as a weighted sum over the *values of all the inputs*, weighted by how strongly they relate to to the $n^{th}$ input.

#### How to compute attention weights?

* This is where keys and queries come into play. They are computed in the same way as values, with their own weights and biases

$$
\begin{aligned}
\mathbf{q}_n &= \boldsymbol{\beta}_q + \boldsymbol{\Omega}_q \mathbf{x}_n \\
\mathbf{k}_m &= \boldsymbol{\beta}_k + \boldsymbol{\Omega}_k \mathbf{x}_m
\end{aligned}
$$

* The keys and queries are then used to compute attention weights with softmax

$$
\begin{aligned}
a[\mathbf{x}_m, \mathbf{x}_n] &= \text{softmax}_m[\mathbf{k}_{\bullet}^T \mathbf{q}_n] \\
&= \frac{\exp[\mathbf{k}_m^T \mathbf{q}_n]}{\sum_{m'=1}^{N} \exp[\mathbf{k}_{m'}^T \mathbf{q}_n]}
\end{aligned}
$$

* This essentially computed the similarity between the $n$<sup>th</sup> token and all the other tokens

* In matrix form this comes together as the below equation, where $\mathbf{X}$ is dimensions $D \times N$ where $N$ is the number of inputs and $D$ is the dimension of each input.

$$
\mathbf{Sa}[\mathbf{X}] = \mathbf{V}[\mathbf{X}] \cdot \text{Softmax}(\mathbf{K}[\mathbf{X}]^T \mathbf{Q}[\mathbf{X}])
$$

## Additional Methods for Self-Attention

### Positional Encoding

* How we encode the position of each input, so the attention head can differentiate `the woman ate the tomato` from `the tomato ate the woman`.

* Define a positional encoding matrix of shape $D \times N$
* Positional encoding gives each token position a **vector**, not just a single number.

* So it needs to vary:

  * **across columns**: to distinguish position 1 from position 2, 3, etc.
  * **across rows**: so different components carry different parts of the positional signal.

* In sinusoidal encodings, each row uses a **different frequency**. That makes each position’s full vector more distinctive.

* If the encoding only varied across columns and was constant down the rows, each position would just be a **single scalar copied across all dimensions**, which is much less expressive.

* Multiple frequencies help attention recover **relative positions** and capture both **short-range and long-range** patterns.

### Scaled attention

* Large dot-product values for some keys can dominate the operation and mean only large values are registered.

* This makes gradients very small and makes the attention difficult to train.

* Can be avoided by scaling the softmax input by $1/\sqrt{D_q}$

$$
\mathrm{SA}[\mathbf{X}]=\mathbf{V} \cdot \operatorname{Softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)
$$

### Multi-head attention

* In practise, self-attention is usually applied multiple times in parallel.

* Each attention head has it's own $\beta_{k}$,$\beta_{q}$,$\beta_{v}$ and $\Omega_{k}$,$\Omega_{q}$,$\Omega_{v}$, so they train independently.

* The input is split into each attention head. For a $D \times N$ base input, the input into each head is $D/H \times N$.

* They are recombined via concatenation and a final linear transform

$$
\mathrm{MhSa}[X] = \Omega_c \left[ \mathrm{Sa}_1[X]^T, \mathrm{Sa}_2[X]^T, \ldots, \mathrm{Sa}_H[X]^T \right]^T
$$

### Transformers

* We now start to bring these ideas together

![Transformer diagram](/transformer.svg)

### Words to vectors

* How we map words to vectors that our transformer can process.

## Tokenisation

* A tokeniser splits the input up into tokens.

* In practise, token != word, tokens represent subwords.

* If we split up to inidividual letters, small vocabulary but the transformer would have to learn every possible relationship between letters.

* If we split it up to words, we would need a huge vocabulary matrix to represent all permutations of all words.

**Byte pair encoding:** Greedily merges common subwords based on their frequency.

* Starts from individual letters, merges the most commonly seen pair, keeps doing this until the vocabulary size reaches a pre-determined limit.

* For example, suppose our corpus contains `low`, `lowest`, `newer`, and `wider`.

* We begin with character-level tokens:

$$
\texttt{l o w}, \quad \texttt{l o w e s t}, \quad \texttt{n e w e r}, \quad \texttt{w i d e r}
$$

* If `e r` is a common adjacent pair, BPE merges it into a single token `er`:

$$
\texttt{l o w}, \quad \texttt{l o w e s t}, \quad \texttt{n e w er}, \quad \texttt{w i d er}
$$

* If `l o` and then `lo w` are also frequent, we get the token `low`:

$$
\texttt{low}, \quad \texttt{low e s t}, \quad \texttt{n e w er}, \quad \texttt{w i d er}
$$

* So instead of learning only full words or only single characters, the tokenizer learns useful subwords like `low` and `er`.

### Tokens to embeddings

* We now know how to make our tokens, so how to we make our vectors (embeddings)?

  * **Token index matrix:** $\mathbf{T} \in \mathbb{R}^{|\mathcal{V}| \times N}$. This is a one hot matrix, and it says where to find each token in the vocab matrix.
  * **Vocabulary matrix:** $\boldsymbol{\Omega}_e \in \mathbb{R}^{D \times |\mathcal{V}|}$. A learned matrix that is a vector representation of each token.

$$\mathbf{X} = \boldsymbol{\Omega}_e\mathbf{T}$$

* In the above equation, $\mathbf{X}$ is the embedding matrix we pass to the transformer.

## Encoders vs Decoders
### Encoder Model

* BERT is an encoder model consisting of 24 transformers in sequence.

* It is trained to correctly predict missing words in bodies of text.

* It is then fine-tuned on specific tasks

### Decoder model
* Modern LLMs are decorder transformers.

* They are a type of **autoregressive model**. This is a statistical mdoel that uses **past data to predict future results**.

* Do this via **masked self-attention**.

#### Masked self-attention
* To train an autoregressive transformer, the transformer should not use future tokens to predict the current token (this is cheating).
* This is cheating because in production, there are no "future tokens" to inform the current token, future tokens only occur in training.
* To prevent the transformer from considering future tokens, all queries that multiply with future keys (from future tokens) in the softmax function are set to $-\infty$.

### How to choose the output token
**Beam Search:** Track multiple possible sentences then choose the overally most likely one.

* This is expensive.

**Temp. Sampling:**
$$
p(w_i) = \frac{e^{y_i / T}}{\sum_j e^{y_j / T}}
$$
* $T=0$, greedy sampling
* $T=0.5$, low randomness, more "correct"
* $T=100$, more random, more "creative"

**Top K:** Limit the temp sampling to the top K most likely words to avoid sampling from the long tail of unlikely tokens. Using an unlikely token can throw off the entire sentence generation.




