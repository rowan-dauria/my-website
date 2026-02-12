---
title: 'Understanding Hamiltonian Monte Carlo'
date: '2026-02-13'
---

Hamiltonian Monte Carlo (HMC) is a Markov Chain Monte Carlo (MCMC) method that uses the derivatives of the density function being sampled to generate efficient transitions.

## The Physical Analogy

HMC is based on Hamiltonian dynamics, from physics. In this framework, we have a system described by position variables $q$ (which correspond to the parameters we want to sample) and momentum variables $p$ (auxiliary variables we introduce).

The **Hamiltonian** $H(q, p)$ represents the total energy of the system:

$$
H(q, p) = U(q) + K(p)
$$

Where:
*   $U(q) = -\log \pi(q)$ is the potential energy, defined by the target distribution $\pi(q)$.
*   $K(p) = \frac{1}{2} p^T M^{-1} p$ is the kinetic energy, where $M$ is a mass matrix (often the identity matrix).

## Hamilton's Equations

The system evolves according to Hamilton's equations:

$$
\begin{aligned}
\frac{dq}{dt} &= \frac{\partial H}{\partial p} = M^{-1} p \\
\frac{dp}{dt} &= -\frac{\partial H}{\partial q} = -\nabla U(q)
\end{aligned}
$$

By simulating these dynamics for a certain time $L\epsilon$, we can propose a new state $(q^*, p^*)$ that is far away from the current state but still has high probability acceptance.

## The Algorithm

1.  **Sample Momentum**: Draw $p \sim \mathcal{N}(0, M)$.
2.  **Simulate Dynamics**: Evolve the system $(q, p)$ according to Hamilton's equations for $L$ steps of size $\epsilon$ (using the Leapfrog integrator).
3.  **Metropolis Correction**: Accept the new state with probability $\min(1, \exp(-H(q^*, p^*) + H(q, p)))$.

### Why it works

Because Hamiltonian dynamics conserve energy ($H$ is constant), the acceptance probability would theoretically be 1. However, due to numerical integration errors (from the Leapfrog steps), we verify with the Metropolis step.

> "Hamiltonian Monte Carlo explores the typical set of the target distribution much more efficiently than Random Walk Metropolis."

## Leapfrog Integrator

The simulation is typically done using the **leapfrog integrator**, which is reversible and preserves volume:

1.  $p(t + \epsilon/2) = p(t) - (\epsilon/2) \nabla U(q(t))$
2.  $q(t + \epsilon) = q(t) + \epsilon M^{-1} p(t + \epsilon/2)$
3.  $p(t + \epsilon) = p(t + \epsilon/2) - (\epsilon/2) \nabla U(q(t + \epsilon))$

This allows us to take larger steps through the parameter space!
