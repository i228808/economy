<script>
  import { onMount } from 'svelte'

  let mode = 'login'
  let loading = false
  let status = ''

  let auth = null
  let portfolio = null
  let selectedWorker = ''
  let workerProofs = []

  let signupForm = { email: '', password: '', display_name: '' }
  let loginForm = { email: '', password: '' }
  let workerForm = { worker_id: '', worker_secret: '', label: '' }
  let walletForm = { wallet_address: '', network: 'solana-localnet' }

  const api = {
    async json(url, method = 'GET', body) {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })
      const payload = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(payload?.message || `${res.status} ${res.statusText}`)
      return payload.data || payload
    },
  }

  function money(n = 0) {
    return `${Number(n || 0).toFixed(3)} ALPEN`
  }

  function fmtNum(n = 0) {
    return new Intl.NumberFormat().format(n)
  }

  function selectedWorkerInfo() {
    if (!portfolio) return null
    return portfolio.workers.find((w) => w.worker_id === selectedWorker)
  }

  async function signup() {
    loading = true
    status = ''
    try {
      const data = await api.json('/api/v1/economy/auth/signup', 'POST', signupForm)
      auth = data
      status = 'Account created. Connect your worker to start earning.'
      await refreshPortfolio()
    } catch (e) {
      status = e.message
    } finally {
      loading = false
    }
  }

  async function login() {
    loading = true
    status = ''
    try {
      const data = await api.json('/api/v1/economy/auth/login', 'POST', loginForm)
      auth = data
      status = 'Logged in successfully.'
      await refreshPortfolio()
    } catch (e) {
      status = e.message
    } finally {
      loading = false
    }
  }

  async function refreshPortfolio() {
    if (!auth?.user_id) return
    const p = await api.json(`/api/v1/economy/users/${auth.user_id}`)
    portfolio = p
    if (!selectedWorker && p.workers.length > 0) {
      selectedWorker = p.workers[0].worker_id
      await refreshProofs()
    }
  }

  async function connectWorker() {
    if (!auth?.user_id) return
    loading = true
    status = ''
    try {
      await api.json(`/api/v1/economy/users/${auth.user_id}/workers`, 'POST', workerForm)
      status = `Worker ${workerForm.worker_id} connected.`
      await refreshPortfolio()
      selectedWorker = workerForm.worker_id
      workerForm = { worker_id: '', worker_secret: '', label: '' }
      await refreshProofs()
    } catch (e) {
      status = e.message
    } finally {
      loading = false
    }
  }

  async function connectWallet() {
    if (!auth?.user_id) return
    loading = true
    status = ''
    try {
      await api.json(`/api/v1/economy/users/${auth.user_id}/wallet`, 'POST', walletForm)
      status = 'Wallet connected.'
      await refreshPortfolio()
    } catch (e) {
      status = e.message
    } finally {
      loading = false
    }
  }

  async function refreshProofs() {
    if (!selectedWorker) return
    try {
      const proofs = await api.json(`/api/v1/economy/workers/${selectedWorker}/proofs`)
      workerProofs = proofs.proofs || []
    } catch {
      workerProofs = []
    }
  }

  function logout() {
    auth = null
    portfolio = null
    selectedWorker = ''
    workerProofs = []
    status = 'Signed out.'
  }

  onMount(async () => {
    if (auth?.user_id) {
      await refreshPortfolio()
    }
  })
</script>

<main class="canvas">
  <div class="aurora left"></div>
  <div class="aurora right"></div>

  <section class="shell reveal">
    <header class="titlebar">
      <div>
        <p class="tag">ALPENMESH WORKER CONSOLE</p>
        <h1>Earn Credits From Your Worker</h1>
        <p class="subtitle">Sign up, connect your local worker ID, attach wallet, and track your ALPEN rewards.</p>
      </div>
      {#if auth}
        <button class="ghost" on:click={logout}>Sign out</button>
      {/if}
    </header>

    {#if !auth}
      <section class="auth-panel fade-up">
        <div class="switcher">
          <button class:active={mode === 'login'} on:click={() => (mode = 'login')}>Login</button>
          <button class:active={mode === 'signup'} on:click={() => (mode = 'signup')}>Sign up</button>
        </div>

        {#if mode === 'signup'}
          <form class="form" on:submit|preventDefault={signup}>
            <input placeholder="Email" bind:value={signupForm.email} type="email" required />
            <input placeholder="Password" bind:value={signupForm.password} type="password" required />
            <input placeholder="Display name" bind:value={signupForm.display_name} required />
            <button disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          </form>
        {:else}
          <form class="form" on:submit|preventDefault={login}>
            <input placeholder="Email" bind:value={loginForm.email} type="email" required />
            <input placeholder="Password" bind:value={loginForm.password} type="password" required />
            <button disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
        {/if}
      </section>
    {:else}
      <section class="dashboard fade-up delayed">
        <div class="grid">
          <article class="card">
            <h2>Profile</h2>
            <p><span>Name</span><b>{portfolio?.display_name}</b></p>
            <p><span>Email</span><b>{portfolio?.email}</b></p>
            <p><span>Wallet</span><b>{portfolio?.wallet?.wallet_address || 'Not connected'}</b></p>
          </article>

          <article class="card">
            <h2>Connect Worker</h2>
            <form class="form compact" on:submit|preventDefault={connectWorker}>
              <input placeholder="worker_id (from local install)" bind:value={workerForm.worker_id} required />
              <input placeholder="worker_secret" bind:value={workerForm.worker_secret} required />
              <input placeholder="label (optional)" bind:value={workerForm.label} />
              <button disabled={loading}>{loading ? 'Connecting...' : 'Connect worker'}</button>
            </form>
          </article>

          <article class="card">
            <h2>Connect Wallet</h2>
            <form class="form compact" on:submit|preventDefault={connectWallet}>
              <input placeholder="wallet address" bind:value={walletForm.wallet_address} required />
              <input placeholder="network" bind:value={walletForm.network} />
              <button disabled={loading}>{loading ? 'Linking...' : 'Link wallet'}</button>
            </form>
          </article>
        </div>

        <section class="workers card">
          <div class="workers-head">
            <h2>Your Workers</h2>
            <select bind:value={selectedWorker} on:change={refreshProofs}>
              {#if portfolio?.workers?.length}
                {#each portfolio.workers as worker}
                  <option value={worker.worker_id}>{worker.label} ({worker.worker_id})</option>
                {/each}
              {:else}
                <option value="">No workers connected</option>
              {/if}
            </select>
          </div>

          {#if selectedWorkerInfo()}
            <div class="stats">
              <div><span>Total Inferences</span><strong>{fmtNum(selectedWorkerInfo().total_inferences)}</strong></div>
              <div><span>Total Reward</span><strong>{money(selectedWorkerInfo().total_reward_alpen)}</strong></div>
              <div><span>Submitted</span><strong>{money(selectedWorkerInfo().submitted_reward_alpen)}</strong></div>
              <div><span>Pending</span><strong>{money(selectedWorkerInfo().pending_reward_alpen)}</strong></div>
            </div>
          {/if}

          <div class="proofs">
            <h3>Recent Proofs</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Inference</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                {#if workerProofs.length === 0}
                  <tr><td colspan="4" class="empty">No proof records yet.</td></tr>
                {:else}
                  {#each workerProofs.slice(0, 12) as proof}
                    <tr>
                      <td><code>{proof.proof_id.slice(0, 10)}...</code></td>
                      <td><span class="badge {proof.chain_status}">{proof.chain_status}</span></td>
                      <td>{fmtNum(proof.total_inferences)}</td>
                      <td>{money(proof.reward_alpen)}</td>
                    </tr>
                  {/each}
                {/if}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    {/if}

    {#if status}
      <p class="status-line">{status}</p>
    {/if}
  </section>
</main>
