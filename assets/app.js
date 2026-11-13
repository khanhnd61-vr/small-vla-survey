(function () {
  var E = '';
  // [name, vlm, lang, param, libero, plus, pro, metaworld, arena, robotwin, calvin]; "*" prefix marks a changed cell
  var rows = [
    ['FLOWER', 'Yes', 'Yes', '*947', '*96.9', E, E, E, E, E, '*4.53<sup>a</sup>'],
    ['Evo-Depth', 'Yes', 'Yes', '900', '95.4', '69.6', E, '84.4', '41.1', E, E],
    ['FabriVLA', 'Yes', 'Yes', '880', E, E, E, '90.0', E, E, E],
    ['Evo-1', 'Yes', 'Yes', '*770', '94.8', E, E, '80.6', E, '37.8<sup>b</sup>', E],
    ['VLA-Adapter', 'Yes', 'Yes', '*500<sup>c</sup>', '*97.3', E, E, E, E, E, '*4.42<sup>a</sup>'],
    ['SmolVLA', 'Yes', 'Yes', '*450', '*87.3', E, E, '*57.3', E, E, E],
    ['TurboVLA (ViT-L)', 'No', 'Yes', '400', E, E, E, E, E, '88.06<sup>d</sup>', E],
    ['TurboVLA (ViT-B)', 'No', 'Yes', '*216', '97.6', E, E, E, E, E, E],
    ['SUREFlow', 'No', '*Cache', '*179<sup>e</sup>', '92.5', E, '49', '88.32', E, E, E],
    ['Octo-Base', 'No', 'Cache<sup>f</sup>', '93', E, E, E, E, E, E, E],
    ['CoRP', 'No', 'Yes', '*48.9', '*97.0', E, E, E, E, '*74.57<sup>d</sup>', E],
    ['Octo-Small', 'No', 'Cache<sup>f</sup>', '27', E, E, E, E, E, E, E],
    ['MicroVLA', 'No', '*Lookup<sup>g</sup>', '*12.4', '*90.2', E, E, E, E, E, E],
    ['MINERVA-5M', 'No', 'Index', '*4.89', '*97.15', '*55.7<sup>h</sup>', E, E, E, E, E],
    ['MINERVA-1M', 'No', 'Index', '*0.99', '*96.75', '*46.0<sup>h</sup>', E, E, E, E, E],
    ['MINERVA-0.5M', 'No', 'Index', '*0.54', '*95.05', '*46.7<sup>h</sup>', E, E, E, E, E],
    ['X-VLA', 'Yes', 'Yes', '900', '98.1', E, E, E, E, '54.5<sup>l</sup>', '4.43<sup>a</sup>'],
    ['SimVLA', 'Yes', 'Yes', '~800<sup>i</sup>', '98.6', E, '48.6<sup>m</sup>', E, E, E, E],
    ['TinyVLA-B', 'Yes', 'Yes', '740', E, E, E, E, E, E, E],
    ['MoDE (pretrained)', 'No', 'Cache', '685–740<sup>k</sup>', E, E, E, E, E, E, '4.01<sup>a</sup>'],
    ['NanoVLA-L', 'No', 'Cache', '520', '80.4', E, E, E, E, E, E],
    ['LLaVA-VLA', 'Yes', 'Yes', '500<sup>i</sup>', E, E, E, E, E, '34.5<sup>l</sup>', '3.68<sup>a</sup>'],
    ['SLIM', 'No', 'Cache', '472<sup>j</sup>', '97.5', '77.45', E, E, E, E, '4.56<sup>a</sup>'],
    ['MoDE', 'No', 'Cache', '460<sup>k</sup>', E, E, E, E, E, E, '3.39<sup>a</sup>'],
    ['SwiftVLA', 'Yes', 'Yes', '450', '94.7', E, E, E, E, '53<sup>l</sup>', E],
    ['DynamicVLA', 'Yes', 'Yes', '430', E, E, E, E, E, E, E],
    ['TinyVLA-S', 'Yes', 'Yes', '422', E, E, E, E, E, E, E],
    ['Dita', 'No', 'Cache', '334', '82.4', E, E, E, E, E, '3.61<sup>a</sup>'],
    ['HyperVLA', 'No', 'Cache', '302<sup>n</sup>', '89', E, E, E, E, E, E],
    ['XS-VLA', 'Yes', 'Yes', '244', '90.3', E, E, E, E, E, E],
    ['NanoVLA-S', 'No', 'Cache', '161', '78.7', E, E, E, E, E, E],
    ['VLA-AD', 'No', 'Yes', '158', E, E, E, E, E, E, E],
    ['Patch Policy', 'No', 'None<sup>o</sup>', '51.55', E, E, E, E, E, E, E],
    ['BAKU', 'No', 'Cache', '10<sup>j</sup>', E, E, E, '79<sup>p</sup>', E, E, E]
  ];
  function size(r) { return parseFloat(r[3].replace(/^[*~]+/, '')); }
  rows = rows.map(function (r, i) { return [r, i]; }).sort(function (a, b) { return size(b[0]) - size(a[0]) || a[1] - b[1]; }).map(function (x) { return x[0]; });
  var heads = ['Model', 'VLM', 'Lang', 'Param (M)', 'LIBERO', 'LIBERO-plus', 'LIBERO-PRO', 'MetaWorld', 'VLA-Arena', 'RoboTwin', 'CALVIN'];
  var h = '<thead><tr>' + heads.map(function (x, i) { return '<th' + (i > 2 ? ' class="num"' : '') + '>' + x + '</th>'; }).join('') + '</tr></thead><tbody>';
  rows.forEach(function (r) {
    h += '<tr>' + r.map(function (c, i) {
      if (i === 0) return '<td class="name">' + c + '</td>';
      var chg = c.charAt(0) === '*'; if (chg) c = c.slice(1);
      if (c === E) return '<td class="empty">·</td>';
      var m = c.match(/^(.*)<sup>([a-z])<\/sup>$/), val = m ? m[1] : c;
      if (m || i === 2) c = '<span class="noted" tabindex="0"' + (m ? ' data-n="' + m[2] + '"' : '') + (i === 2 ? ' data-l="' + val + '"' : '') + '>' + val + '</span>';
      return '<td class="' + (i > 2 ? 'num' : '') + '">' + c + '</td>';
    }).join('') + '</tr>';
  });
  document.getElementById('main').innerHTML = h + '</tbody>';

  var notes = [
    ['a', 'CALVIN is ABC→D average sequence length (max 5). FLOWER also plots this as a normalised 91% (4.53 ÷ 5).'],
    ['b', 'Evo-1 evaluates a 4-task subset of RoboTwin 2.0, not the full benchmark.'],
    ['c', '0.5B is the Qwen2.5 backbone only. VLA-Adapter never states a full-model total; it reports 197.2M trainable parameters, 97.3M of them in the policy head.'],
    ['d', 'RoboTwin 2.0, 50 tasks, mean of Clean and Randomized. TurboVLA: 88.02 / 88.10. CoRP: 75.78 / 73.36; the 74.57 mean is computed here, the paper reports the two separately.'],
    ['e', 'SUREFlow\'s 179.1M almost certainly includes the frozen CLIP text model (about 151M). That split is inferred from the code repository, not stated in the paper.'],
    ['f', 'Octo uses a frozen t5-base (111M) that is not counted in 27M / 93M. The paper does not describe caching embeddings.'],
    ['g', 'MicroVLA reads real text through a static embedding table, not a task ID. The title says 10M; the paper counts 12.4M.'],
    ['h', 'MINERVA\'s LIBERO-plus figures come from a stratified subsample at 2 episodes per variant, not the full protocol.'],
    ['i', 'The headline 0.5B is the VLM backbone only. SimVLA adds an action head of about 300M; the 800M total is summed here from the two rounded figures. LLaVA-VLA gives no breakdown at all.'],
    ['j', 'Excludes a frozen text encoder. SLIM: 472.14M trainable, with T5-small not counted. BAKU: about 10M of trained policy, with the MiniLM sentence encoder not counted.'],
    ['k', 'MoDE counts all experts in 460M; 277M are active per forward pass, and the active counts exclude the frozen CLIP text encoder. The pretrained 12-layer model is 685M in one table of the paper and 740M in another, with 436M active.'],
    ['l', 'Not the standard 50-task Clean and Randomized pair. X-VLA: 50 tasks, Easy 70.0 and Hard 39.0, which the paper never defines; the mean is computed here. LLaVA-VLA: 8 selected tasks, Seen 40.3 and randomized 28.6, mean computed here. SwiftVLA: 6 selected tasks, setting not stated.'],
    ['m', 'SimVLA reports LIBERO-PRO per suite and perturbation with no overall figure. 48.6 is the mean of the 16 perturbed cells, computed here; position and task perturbations are near zero.'],
    ['n', 'Summed here from the parts HyperVLA reports: an 86M encoder that runs every step plus a 216M hypernetwork that runs once per episode. The paper headlines the 86M.'],
    ['o', 'Patch Policy takes no language: tasks are given as a goal image or goal vector. 51.55M is the smallest variant including its frozen encoder; the largest is 334M.'],
    ['p', 'BAKU uses a custom MetaWorld subset (30 tasks in the text, 36 listed in the appendix) with RL-expert demonstrations, not the four-tier MT50 average.']
  ];
  var noteMap = {}; notes.forEach(function (n) { noteMap[n[0]] = n[1]; });
  var ntip = document.createElement('div'); ntip.className = 'tip ntip'; ntip.hidden = true; ntip.setAttribute('role', 'tooltip'); document.body.appendChild(ntip);
  function showNote(e) {
    var r = e.target.getBoundingClientRect();
    var langMap = { Yes: 'Yes: a text encoder or VLM runs on the instruction at inference.', Cache: 'Cache: a frozen text encoder whose per-task embedding is precomputed.', Lookup: 'Lookup: a static word-embedding table with no encoder.', Index: 'Index: a learned task-ID embedding, with no language at all.', None: 'None: no task text or ID; the task is given as a goal image.' };
    var parts = [langMap[e.target.getAttribute('data-l')], noteMap[e.target.getAttribute('data-n')]].filter(Boolean);
    ntip.textContent = parts.join(' '); ntip.hidden = false;
    var w = ntip.offsetWidth, hgt = ntip.offsetHeight;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
    var top = r.top - hgt - 8; if (top < 8) top = r.bottom + 8;
    ntip.style.left = left + 'px'; ntip.style.top = top + 'px';
  }
  function hideNote() { ntip.hidden = true; }
  Array.prototype.forEach.call(document.querySelectorAll('#main .noted'), function (el) {
    el.addEventListener('mouseenter', showNote); el.addEventListener('focus', showNote);
    el.addEventListener('mouseleave', hideNote); el.addEventListener('blur', hideNote);
  });
  window.addEventListener('scroll', hideNote, true);

  var recipe = [
    ['FLOWER', 'Yes, about 250k OXE trajectories', '2: pretrain, then per-benchmark fine-tune', 'Rectified flow, 4 steps', '10', '4× H100, 48 h pretrain (about 200 GPU-h); CALVIN fine-tune about 6 h on 4 GPUs', '311 Hz, 1.85 GB (RTX 4090)'],
    ['Evo-Depth', 'No', '3: progressive unfreezing', 'Flow matching', '50', '8× A100; time not reported', '12.3 Hz, 3.2 GB (RTX 4090D)'],
    ['FabriVLA', 'No', '1', 'Flow matching, 50 Euler steps', '50', '5× RTX PRO 6000 Blackwell; time not reported', '220.5 ms per query (RTX 5090)'],
    ['Evo-1', 'No', '2: frozen VLM, then full', 'Flow matching', '50', '8× A100; time not reported', '16.4 Hz, 2.3 GB (RTX 4090D)'],
    ['VLA-Adapter', 'No', '1, LoRA on the VLM', 'L1 regression', '8', '4× H100; 24.7 GB at batch 8. "8 h on one consumer GPU" appears in the abstract only', '219.2 Hz, 36.5 ms'],
    ['SmolVLA', 'Yes, 22.9k community SO100 episodes (simulation rows are without it)', '2: pretrain, fine-tune', 'Flow matching, 10 steps', '50', '4 GPUs, model unnamed; about 30k GPU-h for the whole project', 'Not reported'],
    ['TurboVLA', 'No', '1', 'L1 regression', '12 LIBERO, 50 RoboTwin', '4× RTX 4090 (LIBERO), 8× H100 (RoboTwin); time not reported', '31.2 ms, 0.9 GiB (RTX 4090)'],
    ['SUREFlow', 'No', '1', 'Flow matching + uncertainty loss, 70 steps', '10', 'RTX 4090; time not reported', 'Not reported'],
    ['Octo', 'Yes, 800k OXE trajectories', '1 pretrain, optional fine-tune', 'DDPM diffusion head, 20 steps', 'Not reported', 'Base: TPU v4-128, 14 h. Fine-tune: one A5000 24 GB, about 5 h', 'Not reported'],
    ['CoRP', 'No (simulation)', '1', 'Flow matching + auxiliary task loss, 10 steps', '12 LIBERO, 50 RoboTwin', '2× A800: about 8 h LIBERO, 13 h RoboTwin', '7.01 ms per chunk (RTX 5090)'],
    ['MicroVLA', 'No', '1', 'L1 regression + contrastive loss', '16', 'Not reported (400k steps, batch 128)', '13.1 ms, 51 MB (RTX 3090); 75.2 ms on CPU'],
    ['MINERVA', 'No', '2: teacher, then distilled student', 'Flow matching (10 steps) or L1', '16', 'One GPU (GH200 or RTX 5080), about 2 h per model', '0.5M: 8.2 ms GPU, 8.9 ms CPU, 0.03 GB'],
    ['X-VLA', 'Yes, 290k episodes (AGIBOT, DROID, RoboMind)', '2: pretrain, then per-benchmark adaptation with a prompt warm-up', 'Flow matching, BCE on gripper; steps not reported', '30', 'Pretrain: 64× A100, about 4 days. Fine-tune hardware not reported', 'Not reported'],
    ['SimVLA', 'No', '1: VLM and head jointly', 'Flow matching; steps not reported', '10 LIBERO, 30 elsewhere', '4× H100; 9.3 GB at batch 8; time not reported', 'Not reported'],
    ['TinyVLA', 'No', '2: own VLM pretraining on image-text data, then LoRA and diffusion head', 'DDPM diffusion head; steps not reported', 'Not reported', 'Not reported', '14 ms for the 1.3B variant (A6000); S and B not reported'],
    ['MoDE', 'Optional, 196k OXE trajectories', '1 from scratch; 2 with pretraining', 'EDM diffusion + expert load-balancing loss, 10 DDIM steps', '10', 'From scratch on 4× A6000: 2 h LIBERO-10, 12 h LIBERO-90, 6.5 h CALVIN. Pretrain: 6× A6000, 3 days', '12.2 ms per action (pretrained model, A6000)'],
    ['NanoVLA', 'Not described', '1, plus a router classifier', 'L2 regression + KL (ACT-style)', '100 trained, 10 executed', 'Not reported for the main results; 10k steps take 19–24 min on an RTX 3060', 'Roughly 15–22 FPS on a Jetson Orin Nano, read from a plot'],
    ['LLaVA-VLA', 'No', '2: multi-task post-training, then per-task fine-tune', 'Autoregressive action tokens, 256 bins', '5', 'Post-training on 8× H100 (CALVIN about 6 h); fine-tune on one RTX 4090', 'Not reported'],
    ['SLIM', 'No (stage 1 adds LIBERO-90)', '2: masked trajectory prediction, then policy', 'Stage 1: flow-matching inverse dynamics + latent forward prediction. Stage 2: flow matching, 4 steps', '8 LIBERO, 12 CALVIN', '8× H100 80 GB; time not reported', '60.6 ms, 4.26 GiB (H100)'],
    ['SwiftVLA', 'Yes, AgiBot World and RoboMIND; volume not reported', '2 pretrain + 2 fine-tune: action only, then with 4D features', 'Diffusion noise prediction + feature reconstruction + trajectory loss', 'Not reported', 'Not reported', '0.167 s, 1.4 GB (Jetson Orin)'],
    ['DynamicVLA', 'Own benchmark data only (200k synthetic episodes)', '3: image-text alignment, synthetic, real', 'Flow matching; steps not reported', '20', '32× A100, about 2 weeks', '0.226 s per chunk, 1.8 GB (RTX A6000)'],
    ['Dita', 'Yes, OXE', '2: pretrain, per-benchmark fine-tune', 'DDPM noise prediction; 20 DDIM steps zero-shot', '16 in pretraining', 'Pretrain on 32× A100; LIBERO on 8× A100; time not reported', '3 Hz control (A100)'],
    ['HyperVLA', 'Yes, OXE', '2: pretrain, LIBERO fine-tune', 'MSE regression, single pass', '4', '4× A5000, 1 day', '4 ms per step (L4), excluding the once-per-episode hypernetwork'],
    ['XS-VLA', 'No', '2: spatial distillation into the backbone, then policy', 'Huber flow matching + KL on a latent, 10 steps', '50, 10 executed', 'Not reported for LIBERO; one RTX 3090 for the real robot', '321 ms per chunk, 0.51 GiB (RTX 3090)'],
    ['VLA-AD', 'No (trained on teacher rollouts)', '1, after offline annotation', 'Cross-entropy on 256-bin teacher action tokens', '5', 'About 22 GPU-hours per student; GPU not named', '12.5 Hz (RTX 4090)'],
    ['Patch Policy', 'No', '1', 'VQ-BeT classification + regression, or diffusion', '1–10 by task', 'One L40S, 6.5 h', '10.99 ms (VQ-BeT + DINOv2); 446 ms with the diffusion head'],
    ['BAKU', 'No', '1', 'MSE regression, single pass', '10', 'One RTX A4000: about 10.5 h LIBERO, 8 h MetaWorld', '10 Hz control on the real robot; latency not reported']
  ];
  recipe.forEach(function (r) { r.splice(4, 1); });
  var rh = ['Model', 'Robot pretraining', 'Stages', 'Objective', 'Training hardware and time', 'Inference'];
  var arch = [["FLOWER", "Florence-2-L vision tower, 360M", "Florence-2-L text encoder half, 205M (decoder removed)", "Inside the Florence encoder; the head cross-attends to intermediate VLM features. Global-AdaLN conditioning, 28.3M", "18-layer Flow Transformer, 339M", "Not found in the paper", "10 (20 in pretraining)"], ["Evo-Depth", "InternViT-300M, plus a 0.13B depth encoder initialised from Depth Anything 3", "Qwen2.5-0.5B, first 14 layers", "InternVL3 inserts image tokens into the LLM; depth features modulate the VLM tokens FiLM-style", "8-layer flow-matching DiT; size not reported", "448", "50"], ["X-VLA", "Florence-Large vision tower, also used alone for wrist views; size not reported", "Florence-Large encoder; size not reported", "Florence encoder on main view + instruction; per-dataset soft-prompt tokens (0.04% of parameters)", "24-layer, width-1024 self-attention Transformer; size not reported", "224", "30 anchor points over 4 s"], ["FabriVLA", "InternVL3.5-1B vision encoder; size not reported", "InternVL3.5-1B LLM, truncated to 14 layers", "Features of VLM layers 6 and 14 fused before the head", "8-block, width-1024 flow head with gated self-attention; 0.58M conformal head on top", "Not stated", "50 (5 executed)"], ["SimVLA", "SmolVLM-0.5B, vision and language together about 500M", "(inside SmolVLM)", "VLM output tokens concatenated with state, time and noised actions", "24-layer, width-1024 self-attention Transformer, about 300M", "128 on LIBERO, 224 elsewhere", "10 LIBERO, 30 elsewhere"], ["Evo-1", "InternViT-300M", "Qwen2.5-0.5B, first 14 layers", "InternVL3 inserts image tokens into the LLM; an integration module aligns VLM features with robot state", "8-layer flow-matching DiT, cross-attention only; size not reported", "448", "50"], ["TinyVLA (S, B)", "ViT, not named", "Pythia language model; size not reported", "LLaVA-style adapter; pooled VLM output + state through a 3-layer MLP", "Diffusion Policy head; size not reported (trainable total 101M / 138M including LoRA)", "Not reported", "Not reported"], ["MoDE", "Two FiLM ResNet-18 (ResNet-50 for CALVIN ABC and the pretrained model)", "Frozen CLIP ViT-B/32 text encoder, one goal token; not in the active count", "Text conditions the ResNets through FiLM; goal token sits in the transformer sequence", "8-layer (12 when pretrained), width-1024 mixture-of-experts diffusion transformer", "Not reported", "10"], ["NanoVLA (S, L)", "Frozen ResNet18", "Frozen BERT-base (S) or Qwen2.5-0.5B (L), cached", "Late fusion: 4-layer transformer encoder over one language token, state and image tokens", "ACT-style decoder with linear head; fusion + head 52M", "Not reported", "100 trained, 10 executed"], ["VLA-Adapter", "DINOv2 + SigLIP (Prismatic)", "Qwen2.5-0.5B with LoRA", "64 learnable ActionQuery tokens; gated Bridge Attention reads all VLM layers", "24-layer policy, 97.3M", "224 (84 for the CALVIN gripper view)", "8"], ["LLaVA-VLA", "LLaVA-OneVision vision encoder, not named", "0.5B LLM", "Two views merged vertically into one image; proprioception as tokens", "None: the LLM emits 256-bin action tokens", "Not reported (cameras record 480×640)", "5"], ["SLIM", "DINOv2-B/14, 86.58M", "Frozen T5-small, cached; not counted", "16-layer two-stream transformer, 377.96M; language enters each stream by cross-attention", "Action stream of the same transformer; interfaces and heads 7.60M", "224", "8 LIBERO, 12 CALVIN"], ["SmolVLA", "SigLIP from SmolVLM-2, 64 tokens per image", "SmolLM2, first 16 layers; VLM frozen, about 350M", "Expert interleaves cross-attention to VLM features with causal self-attention", "Flow-matching expert, about 100M", "512", "50"], ["SwiftVLA", "SigLIP from SmolVLM; a frozen 4D geometry transformer (about 1.2B) in training only", "SmolVLM language model, first 16 layers", "Learnable fusion tokens; 4D features dropped at inference", "SmolVLA-style expert, about 100M", "512", "Not reported"], ["DynamicVLA", "FastViT (convolutional), 36 tokens; size not reported", "SmolLM2-360M, first 16 layers", "Visual and state tokens projected into the language model; expert attends to its cached key-values", "16-layer flow-matching expert, width 720; size not reported", "384", "20"], ["TurboVLA", "DINOv3 ViT-B/16 (LIBERO) or ViT-L/16 (RoboTwin)", "Frozen BERT-base", "Six bidirectional cross-attention layers initialised from Grounding DINO", "ACT-style decoder, one pass; size not reported", "256 on LIBERO, 224 on RoboTwin", "12 LIBERO, 50 RoboTwin"], ["Dita", "DINOv2, fine-tuned; variant not stated", "Frozen CLIP text encoder; variant not stated (about 113M frozen in all)", "4-layer Q-Former, FiLM-conditioned on text, 32 tokens per image", "12-layer, width-768 causal Transformer that denoises actions in context; no separate head", "224", "16 in pretraining"], ["HyperVLA", "DINOv2, 86M, fine-tuned; a second frozen 86M copy feeds the hypernetwork", "Frozen T5, 100M, run once per episode", "Hypernetwork context encoder, 30M, turns instruction + first image into policy weights", "Generated 4-layer transformer with linear head, 0.1M", "Not reported", "4"], ["XS-VLA", "SmolVLM2-256M vision encoder", "SmolVLM2-256M language model, 16 layers", "As SmolVLA, plus a 32-d latent token; posterior encoder (0.84M) in training only", "SmolVLA-style flow expert; size not reported", "256 in the latency profile; training size not stated", "50 (10 executed)"], ["SUREFlow", "Two ResNet-18, one per view", "CLIP ViT-B/32 text embedding, precomputed (about 151M, inferred from the repo)", "5 Mamba layers, width 256", "One-layer cross-attention decoder with 10 action queries", "Not reported", "10"], ["VLA-AD", "Long-CLIP image tower with rank-8 LoRA; variant not stated", "Long-CLIP text tower, presumed; not described", "Not described", "Tri-stream MLP head; LoRA + head 8.6M", "Not reported", "5"], ["Octo (Small, Base)", "Shallow CNN patch stem, no pretrained encoder", "Frozen t5-base, 111M; not counted", "One transformer over all tokens (ViT-S or ViT-B sized) with readout tokens", "3-layer MLP diffusion head", "256 main camera, 128 wrist", "Not reported"], ["Patch Policy", "Frozen DINOv2 ViT-S/14, 22M (or WebSSL ViT-L, 304M); all patch tokens kept", "None", "Goal image through the same encoder; block-causal attention across frames", "VQ-BeT transformer, 29.5M, or Diffusion Policy transformer, 9.2M", "224", "1 to 10 by task"], ["CoRP", "DINOv2 ViT-S/14, 22.1M", "T5-Efficient-Tiny, 11.4M", "Resampler to 48 tokens per view", "One-block DiT, about 12.2M", "224", "12 LIBERO, 50 RoboTwin"], ["MicroVLA", "Theia-tiny, 5.5M", "POTION static embedding table, 2.0M", "FiLM + 8-query Perceiver pool, 3.0M", "5-block MLP-ResNet, 1.9M", "224", "16"], ["BAKU", "FiLM ResNet-18, 1.5M", "6-layer MiniLM sentence encoder; not counted", "FiLM in the ResNet; 8-layer minGPT trunk, 6.5M", "2-layer MLP head, 1.4M", "128 (84 on Meta-World)", "10"], ["MINERVA", "Depthwise-separable CNN trained from scratch, spatial-softmax keypoints", "40-entry task-ID embedding, no text", "FiLM on the CNN", "4-layer DiT; whole model 0.54M to 4.89M", "128 (256 resized to 144, cropped)", "16"]];
  var ah = ["Model", "Vision", "Language", "Vision-language bridge", "Action module", "Input image (px)", "Action chunk"];
  document.getElementById('arch').innerHTML = '<thead><tr>' + ah.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
    arch.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i === 0 ? ' class="name"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
  document.getElementById('recipe').innerHTML = '<thead><tr>' + rh.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' +
    recipe.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (i === 0 ? ' class="name"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';

  function ax(id) { return 'https://arxiv.org/abs/' + id; }
  var papers = [
    { id: 'flower', name: 'FLOWER', title: 'FLOWER: Democratizing Generalist Robot Policies with Efficient Vision-Language-Action Flow Policies', org: 'KIT Intuitive Robots Lab, Microsoft Research', venue: 'CoRL 2025', url: ax('2509.04996'), ref: 'arXiv 2509.04996',
      tldr: 'Prunes Florence-2-L to its encoder half and feeds intermediate VLM features by cross-attention into a large 18-layer flow transformer, moving capacity from the VLM to the action head. A shared conditioning layer with LoRA adapters handles several action spaces with about 20% fewer head parameters.',
      f: [['Model', '947M: vision 360M, VLM 205M, flow transformer 339M, conditioning 28M. The VLM is fine-tuned; freezing it drops CALVIN from 4.44 to 2.65.'],
          ['Recipe', 'Pretrain on eight Open X-Embodiment datasets (about 250k trajectories, 360k steps), then fine-tune per benchmark: 30k steps per LIBERO suite, up to 40k for CALVIN. Rectified-flow velocity loss; 4 denoising steps single-arm, 8 dual-arm. AdamW, LR 1e-4 for the head and 1e-5 for the VLM, effective batch 1024.'],
          ['Compute', 'Pretraining on 4× H100 for 48 h, about 200 GPU-hours. CALVIN fine-tune about 6 h on 4 GPUs. Training VRAM not reported. Inference 311 Hz, 52 ms, 1.85 GB on an RTX 4090.'],
          ['Results', 'LIBERO 97.5 / 99.1 / 96.1 / 94.9, average 96.9; LIBERO-90 94.7. CALVIN ABC→D 4.53, ABCD→D 4.67. SIMPLER Bridge 45, Google Robot 31.9. Real Franka kitchen 61%.'],
          ['Caveat', 'The paper contradicts itself in places: LIBERO-Long is 93.5 in the text and 94.9 in the table; SIMPLER Bridge is 40 and 45.']] },
    { id: 'evo-depth', name: 'Evo-Depth', title: 'Evo-Depth: A Lightweight Depth-Enhanced Vision-Language-Action Model', org: 'Shanghai Jiao Tong University, KAUST, NTU', venue: 'preprint', url: ax('2605.14950'), ref: 'arXiv 2605.14950',
      tldr: 'Adds depth awareness from RGB alone to an Evo-1-style VLA. A 0.13B multi-view encoder initialised from Depth Anything 3 produces depth features that modulate the VLM tokens, with no depth sensor and no depth loss.',
      f: [['Model', '0.9B. InternVL3-1B with the language branch cut to 14 layers, the depth encoder, and an 8-layer flow-matching action expert.'],
          ['Recipe', 'No robot pretraining. Three stages, each resuming from the last: fusion module and action expert only (5k steps); depth encoder unfrozen (10k); everything (120k). Flow-matching loss only. AdamW, LR 1e-5, batch 16; 448 px input; chunk of 50.'],
          ['Compute', '8× A100 for MetaWorld; hours and VRAM not reported. Inference 12.3 Hz at 3.2 GB on an RTX 4090D.'],
          ['Results', 'LIBERO 95.6 / 99.2 / 95.6 / 91.3, average 95.4. LIBERO-plus 69.6. MetaWorld 84.4. VLA-Arena 41.1. Real xArm6 90.0%.']] },
    { id: 'fabrivla', name: 'FabriVLA', title: 'FabriVLA: A Lightweight Vision-Language-Action Model with Conformal Action Chunk Uncertainty', org: 'University of Macau, Youibot Robotics', venue: 'preprint', url: ax('2607.08575'), ref: 'arXiv 2607.08575',
      tldr: 'A 0.88B VLA on a truncated InternVL3.5-1B with a flow-matching head. It adds gated self-attention among action tokens and fuses a shallow VLM layer with the deep one. The latest version adds a 0.58M conformal head that gives uncertainty sets over the executed actions.',
      f: [['Recipe', 'No robot pretraining; one stage with everything unfrozen. Trained on 50 demonstrations for each of 50 MetaWorld tasks, 100k steps. Flow-matching loss; 8-block head; chunk of 50 with 5 executed; 50 Euler steps. AdamW, LR 2e-5, batch 40.'],
          ['Compute', '5× RTX PRO 6000 Blackwell; hours and VRAM not reported. Inference 220.5 ms median per query on an RTX 5090.'],
          ['Results', 'MetaWorld MT50 95.0 / 88.2 / 86.7 / 90.0, tier average 90.0. No LIBERO result for the policy.'],
          ['Caveat', 'The current version has no appendix, so most training details come from the earlier versions, which gave 0.89B.']] },
    { id: 'evo-1', name: 'Evo-1', title: 'Evo-1: Lightweight Vision-Language-Action Model with Preserved Semantic Alignment', org: 'Shanghai Jiao Tong University and others', venue: 'preprint', url: ax('2511.04555'), ref: 'arXiv 2511.04555',
      tldr: 'A 0.77B VLA on InternVL3-1B with a cross-attention-only flow-matching action head. Two-stage training keeps the VLM\'s semantic attention intact, and no robot pretraining is used.',
      f: [['Recipe', 'Stage 1: VLM frozen, integration module and action expert trained (10k steps). Stage 2: everything trained (65k steps). Flow-matching loss; 8-layer head; chunk of 50; LR 1e-5, batch 16; 448 px input.'],
          ['Compute', '8× A100; hours and VRAM not reported. Inference 16.4 Hz at 2.3 GB on an RTX 4090D.'],
          ['Results', 'LIBERO 92.7 / 97.7 / 96.3 / 92.3, average 94.8. MetaWorld 89.2 / 76.8 / 77.2 / 79.2, average 80.6. RoboTwin 2.0 four-task subset 37.8. Real xArm6 78%.']] },
    { id: 'vla-adapter', name: 'VLA-Adapter', title: 'VLA-Adapter: An Effective Paradigm for Tiny-Scale Vision-Language-Action Model', org: 'BUPT, Westlake University, OpenHelix and others', venue: 'preprint', url: ax('2509.09372'), ref: 'arXiv 2509.09372',
      tldr: 'Studies which VLM features best condition an action policy and finds that features from every layer, combined with learnable action-query tokens, work best. Builds a 97M regression policy with gated "Bridge Attention" on a Qwen2.5-0.5B VLM, with no robot pretraining.',
      f: [['Recipe', 'One stage, end to end: the VLM is fine-tuned with LoRA; 64 action-query tokens and the policy are trained from scratch. L1 regression on an 8-step chunk. AdamW, LR 1e-4, batch 16, up to 150k steps.'],
          ['Compute', 'Experiments on 4× H100. Training VRAM 24.7 GB at batch 8. The abstract claims 8 hours on a single consumer GPU, but the paper never names the GPU or the setting. Inference 219.2 Hz, 36.5 ms.'],
          ['Results', 'LIBERO 97.8 / 99.2 / 97.2 / 95.0, average 97.3 (Pro variant 98.5). CALVIN ABC→D 4.42 (Pro 4.50). With a frozen backbone: 86.4 on LIBERO-Long.']] },
    { id: 'smolvla', name: 'SmolVLA', title: 'SmolVLA: A vision-language-action model for affordable and efficient robotics', org: 'Hugging Face, Sorbonne University', venue: 'preprint', url: ax('2506.01844'), ref: 'arXiv 2506.01844',
      tldr: 'A 0.45B open VLA pairing a frozen, truncated SmolVLM-2 with a roughly 100M flow-matching action expert. Pretrained only on community-collected SO100 data, with an asynchronous inference stack that separates chunk prediction from execution.',
      f: [['Recipe', 'Pretrain on 481 community datasets (22.9k episodes, 200k steps, batch 256), then fine-tune 100k steps at batch 64 for simulation. The VLM stays frozen; only the action expert trains. Flow matching, 10 steps; chunk of 50. The simulation scores start from the VLM only, without the robot pretraining.'],
          ['Compute', 'Pretraining on 4 GPUs (model unnamed); "can easily be trained on a single GPU". About 30k GPU-hours for the whole project. No absolute VRAM or latency figures.'],
          ['Results', 'LIBERO 90 / 96 / 92 / 71, average 87.3. MetaWorld 82.5 / 41.8 / 45.0 / 60.0, average 57.3. The 0.24B variant scores 82.75 / 56.95; the 2.25B variant 88.75 / 68.24. Real SO100 78.3%.']] },
    { id: 'turbovla', name: 'TurboVLA', title: 'TurboVLA: Real-Time Vision-Language-Action Model at 32 Hz on an RTX 4090 with <1 GB VRAM', org: 'Huazhong University of Science and Technology', venue: 'preprint', url: ax('2607.27205'), ref: 'arXiv 2607.27205',
      tldr: 'Drops the VLM entirely. A DINOv3 image encoder and a frozen BERT are fused by six bidirectional cross-attention layers initialised from Grounding DINO, and an ACT-style decoder regresses action chunks in one forward pass.',
      f: [['Two rows', 'The same architecture with two vision backbones, one per benchmark: ViT-B (216M) for LIBERO and ViT-L (0.4B) for RoboTwin 2.0. Neither is evaluated on the other benchmark.'],
          ['Recipe', 'No robot pretraining; one stage; only BERT is frozen. L1 loss on action chunks, no denoising. AdamW, LR 5e-5. LIBERO: 40k steps, batch 128. RoboTwin: 150k steps, batch 512.'],
          ['Compute', '4× RTX 4090 for LIBERO, 8× H100 for RoboTwin; hours not reported. Inference on an RTX 4090: 31.2 ms and 0.9 GiB (ViT-B), 43.4 ms (ViT-L).'],
          ['Results', 'LIBERO 97.0 / 100.0 / 98.2 / 95.2, average 97.6. RoboTwin 2.0 Clean 88.02, Randomized 88.10. Real AgileX Piper 87.5%. Replacing instructions with a task ID scores 96.6.']] },
    { id: 'sureflow', name: 'SUREFlow', title: 'SUREFlow: State-space Uncertainty-aware REsidual Flow Matching for Robust Robot Manipulation', org: 'Kyungpook National University', venue: 'IROS 2026', url: ax('2607.10504'), ref: 'arXiv 2607.10504',
      tldr: 'A small Mamba-based flow-matching policy trained from scratch. A per-dimension uncertainty head weights the training loss and, at inference, re-refines only the uncertain action dimensions.',
      f: [['Model', 'Two ResNet-18 view encoders, 5 Mamba layers, a one-layer cross-attention action decoder, and a CLIP text embedding that is precomputed and fixed per task.'],
          ['Recipe', 'No pretraining; one stage. Flow matching plus an uncertainty-weighted residual loss. AdamW, LR 1e-4, batch 256, 300 epochs. 70 integration steps, then up to 3 refinement passes.'],
          ['Compute', 'RTX 4090, count not stated. Hours, VRAM and latency not reported.'],
          ['Results', 'LIBERO 94.8 / 91.0 / 93.8 / 90.2, average 92.5. MetaWorld 88.32. LIBERO-PRO 0.49, with position and task perturbations at 0.00 in every suite.'],
          ['Caveat', 'No appendix; several details come from the code repository, whose defaults differ from the paper.']] },
    { id: 'octo', name: 'Octo', title: 'Octo: An Open-Source Generalist Robot Policy', org: 'UC Berkeley, Stanford, CMU, Google DeepMind', venue: 'arXiv, 2024', url: ax('2405.12213'), ref: 'arXiv 2405.12213',
      tldr: 'An open generalist policy: a transformer with a diffusion action head, pretrained on 800k Open X-Embodiment trajectories and conditioned on language or goal images. Its token design lets new sensors and action spaces be added at fine-tuning time.',
      f: [['Model', 'Small is 27M, Base is 93M. Images go through a shallow convolutional stem, not a pretrained encoder. Language uses a frozen t5-base.'],
          ['Recipe', 'Pretrain on 25 datasets: 300k steps, batch 2048, AdamW LR 3e-4. Diffusion objective with 20 steps in a small MLP head. Fine-tune the full model on about 100 demonstrations for 50k steps.'],
          ['Compute', 'Base pretraining on a TPU v4-128 pod in 14 hours; Small not reported. Fine-tuning on one A5000 (24 GB) in about 5 hours.'],
          ['Results', 'Real robot only: 72% average after fine-tuning across 6 setups, against 20% from scratch. None of the seven table benchmarks is reported.']] },
    { id: 'corp', name: 'CoRP', title: 'Compact Robot Policies Need Fine-Grained Visual Representations', org: 'X Square Robot, KTH', venue: 'preprint, under review', url: ax('2610.08183'), ref: 'arXiv 2610.08183',
      tldr: 'A deliberately minimal 48.9M language-conditioned flow-matching policy with no VLM. Its main finding is that the visual representation must be pretrained, fine-tuned and hard-compressed: freezing the vision encoder drops LIBERO from 97.0 to 77.2.',
      f: [['Model', 'DINOv2 ViT-S (22.1M), T5-Efficient-Tiny (11.4M), a resampler that compresses each view to 48 tokens, and a one-block action transformer (about 12M). All trainable.'],
          ['Recipe', 'No robot pretraining for simulation; one end-to-end stage. Flow matching plus a small auxiliary task-classification loss; 10 Euler steps. AdamW, LR 5e-5, batch 392. LIBERO 80k steps, RoboTwin 120k.'],
          ['Compute', '2× A800: about 8 hours for LIBERO, 13 hours for RoboTwin. Inference 7.01 ms per chunk on an RTX 5090; weights take 95.4 MB.'],
          ['Results', 'LIBERO 98.2 / 99.4 / 95.8 / 94.4, average 97.0 (37M variant 93.9, 63M variant 98.4). RoboTwin 2.0 Clean 75.78, Randomized 73.36.']] },
    { id: 'microvla', name: 'MicroVLA', title: 'MicroVLA: Edge-Deployable Vision Language Action at 10M Parameters', org: 'Seoul National University, Ajou University, Tommoro Robotics', venue: 'RSS 2026 workshop, 4 pages', url: 'https://openreview.net/forum?id=hpx4c5nDsy', ref: 'OpenReview hpx4c5nDsy',
      tldr: 'Shrinks all three branches together: a static text-embedding lookup instead of a language model, a tiny distilled vision encoder, and a one-pass regression head. Plain behaviour cloning reaches only 77.6% at this size; a contrastive auxiliary loss with augmentation lifts it to 90.2%.',
      f: [['Model', '12.4M, 47 MB on disk: Theia-tiny vision 5.5M, text table 2.0M, fusion 3.0M, head 1.9M.'],
          ['Recipe', 'No robot pretraining. One stage on the four LIBERO suites mixed: batch 128, 400k steps. L1 on a 16-step chunk plus a temporal contrastive loss on the fused features, with crop and colour augmentation. Optimiser and learning rate not reported.'],
          ['Compute', 'Training hardware and hours not reported. Inference 13.1 ms and 51 MB on an RTX 3090; 75.2 ms on a Threadripper CPU. Measured on synthetic inputs.'],
          ['Results', 'LIBERO 91.0 / 93.8 / 92.2 / 83.8, average 90.2. No other benchmark and no real robot.'],
          ['Ablation', 'Augmentation alone 81.1; contrastive loss without augmentation 70.4; both 90.2. The same recipe scaled to 137M with plain behaviour cloning reaches 95.5.']] },
    { id: 'minerva', name: 'MINERVA', title: 'MINERVA: How Small Can a Manipulation Policy Be and Still Solve LIBERO?', org: 'Matsuo-Iwasawa Lab, University of Tokyo', venue: 'preprint', url: ax('2609.03715'), ref: 'arXiv 2609.03715',
      tldr: 'A capacity-floor study, not a VLA. A from-scratch CNN, a 40-entry task-ID embedding and a small action head reach 95% on LIBERO at 0.54M parameters. The same models fall to 46–56% on LIBERO-plus, showing that standard LIBERO mostly tests memorised task selection.',
      f: [['Model', 'A shared CNN with keypoint pooling and a 4-layer action transformer. Variants at 0.54M, 0.99M, 4.89M and 9.66M; the last is not in the table and scores 97.45.'],
          ['Recipe', 'No pretraining of any kind. Train a larger teacher, then train each student with flow matching plus distillation from the frozen teacher. Flow matching with 10 Euler steps, or one-pass L1. Chunk of 16. AdamW, LR 1e-4, batch 128, 90–120k steps.'],
          ['Compute', 'About 2 hours per model on one GPU (GH200 or RTX 5080). Inference for 0.5M: 8.2 ms GPU, 8.9 ms CPU, 0.03 GB.'],
          ['Results', 'LIBERO 97.15 / 96.75 / 95.05 for 5M / 1M / 0.5M. LIBERO-90 at 1M: 94.6%. The 1M model over three seeds is 95.63 ± 1.08, so 96.75 is the top of the seed range.']] },
    { id: 'x-vla', name: 'X-VLA', title: 'X-VLA: Soft-Prompted Transformer as Scalable Cross-Embodiment Vision-Language-Action Model', org: 'Tsinghua AIR, Shanghai AI Lab, Peking University', venue: 'preprint', url: ax('2510.10274'), ref: 'arXiv 2510.10274',
      tldr: 'Gives each data source its own learnable soft-prompt tokens and projections so a plain self-attention Transformer can be pretrained with flow matching on mixed-embodiment data. The 0.9B model is then adapted per benchmark, fully or with LoRA on about 9M parameters.',
      f: [['Model', '0.9B: Florence-Large encoder plus a 24-layer, width-1024 Transformer. No component breakdown. Nothing is frozen in full fine-tuning.'],
          ['Recipe', 'Pretrain on 290k episodes from AGIBOT-beta, DROID and RoboMind: 200k iterations, batch 1024, AdamW, LR 1e-4. Adapt per benchmark: 1,000 iterations on the new soft prompts and projections only, then everything; 60k steps at batch 128 for LIBERO, CALVIN and RoboTwin. Flow-matching loss with BCE on the gripper; chunk of 30 anchor points over 4 seconds.'],
          ['Compute', 'Pretraining on 64× A100 for about 4 days. Fine-tuning hardware, VRAM and all inference figures are not reported.'],
          ['Results', 'LIBERO 98.2 / 98.6 / 97.8 / 97.6, average 98.1. CALVIN ABC→D 4.43. RoboTwin 2.0 (50 tasks) Easy 70.0, Hard 39.0. SimplerEnv WidowX 95.8. With LoRA: LIBERO about 93, SimplerEnv WidowX 54.2.'],
          ['Caveat', 'The LoRA LIBERO numbers differ between two tables, and the CALVIN per-step rates sum to 4.41, not 4.43. Trials per task are not stated for any simulation benchmark.']] },
    { id: 'simvla', name: 'SimVLA', title: 'SimVLA: A Simple VLA Baseline for Robotic Manipulation', org: 'Frontier Robotics', venue: 'preprint', url: ax('2602.18224'), ref: 'arXiv 2602.18224',
      tldr: 'A deliberately minimal VLA: a small VLM as a fused vision-language encoder plus a vanilla self-attention flow-matching head. The claimed contribution is the training recipe (shuffling, action normalisation, a 0.1× learning rate on the VLM, chunk length), not the architecture.',
      f: [['Model', 'SmolVLM-0.5B plus a 24-layer action head of about 300M, so about 0.8B in total; the paper headlines the backbone alone. A small-head variant is about 0.58B. The Florence-2 variant used on the real robot is about 1.2B. Nothing is frozen.'],
          ['Recipe', 'No robot pretraining; one stage. Flow matching with an L2 velocity loss; Euler steps not reported. LIBERO: one model for all four suites, 150k steps, batch 256, AdamW, LR 2e-4, 128 px images, chunk of 10.'],
          ['Compute', '4× H100 for simulation; 9.3 GB training VRAM at batch 8. Hours and all inference figures are not reported.'],
          ['Results', 'LIBERO 99.6 / 99.8 / 98.6 / 96.4, average 98.6 (small head 98.0). LIBERO-PRO, zero-shot: object and semantic perturbations mostly 61–100, position 0–29, task 0–10. SimplerEnv WidowX 95.8, Google Robot 76.1.'],
          ['Caveat', 'The prose gives slightly different LIBERO suite numbers from the tables. The ablations swing widely (chunk of 30 gives 87.3) and appear tuned on LIBERO test success.']] },
    { id: 'tinyvla', name: 'TinyVLA', title: 'TinyVLA: Towards Fast, Data-Efficient Vision-Language-Action Models for Robotic Manipulation', org: 'East China Normal University, Midea Group and others', venue: 'RA-L 2025', url: ax('2409.12514'), ref: 'arXiv 2409.12514',
      tldr: 'Builds a VLA from a family of small self-trained LLaVA-style VLMs on Pythia language models, fine-tuned with LoRA, with a Diffusion Policy head in place of action tokens. No robot-data pretraining.',
      f: [['Model', 'TinyVLA-S 422M (101M trainable), TinyVLA-B 740M (138M trainable), TinyVLA-H 1.3B (143M trainable). Only S and B are under 1B. Totals include the frozen VLM.'],
          ['Recipe', 'Stage 1: the VLM is trained on image-text data with the LLaVA pipeline. Stage 2: LoRA on the VLM, with the adapter and diffusion head trained fully. Denoising steps, chunk length, optimiser, learning rate and batch size are not reported.'],
          ['Compute', 'Training hardware and time not reported. Inference 14 ms on an A6000, for the H variant only.'],
          ['Results', 'Real Franka, 5 tasks, 20 trials each: S 23.3%, B 77.4%, H 94.0%. MetaWorld tier average 31.6 for H only. No LIBERO, CALVIN or RoboTwin.'],
          ['Caveat', 'Every headline number belongs to the 1.3B variant, which is over the 1B line.']] },
    { id: 'mode', name: 'MoDE', title: 'Efficient Diffusion Transformer Policies with Mixture of Expert Denoisers for Multitask Learning', org: 'KIT Intuitive Robots Lab, MIT', venue: 'preprint, December 2024', url: ax('2412.12953'), ref: 'arXiv 2412.12953',
      tldr: 'A diffusion-transformer policy whose feed-forward blocks are a sparse mixture of experts routed only by the diffusion noise level. Because routing ignores the observation, the experts for each denoising step can be precomputed and fused, which the paper says cuts FLOPs by about 90%.',
      f: [['Model', 'Frozen CLIP text encoder, two FiLM ResNets and an 8-layer, width-1024 transformer with 4 experts per layer, 2 used per pass. 460M total, 277M active. The pretrained model has 12 layers: 685M or 740M total depending on the table, 436M active.'],
          ['Recipe', 'From scratch: one stage per benchmark; AdamW, LR 1e-4, batch 512; 15k steps for LIBERO-10, 30k for LIBERO-90, 25k for CALVIN ABC. Pretrained: 196k trajectories from six OXE datasets for 300k steps, then 10–15k fine-tuning steps with the routers frozen. EDM diffusion loss plus a load-balancing loss; 10 DDIM steps; chunk of 10.'],
          ['Compute', 'From scratch on 4× A6000: 2 h for LIBERO-10, 12 h for LIBERO-90, 6.5 h for CALVIN ABC. Pretraining on 6× A6000 for 3 days. Inference 12.2 ms per action on an A6000 (pretrained model).'],
          ['Results', 'CALVIN ABC→D 3.39 from scratch, 4.01 pretrained. LIBERO-10 0.92 and 0.94; LIBERO-90 0.91 and 0.95. SIMPLER 26.3% (pretrained).'],
          ['Caveat', 'No Spatial, Object or Goal results, so no four-suite average. LIBERO-10 is in the pretraining mix. Step counts differ between the table and the appendix.']] },
    { id: 'nanovla', name: 'NanoVLA', title: 'NanoVLA: Routing Decoupled Vision-Language Understanding for Nano-sized Generalist Robotic Policies', org: 'University of British Columbia, University of Alberta, Xiaomi EV, Northeastern University', venue: 'preprint, under review', url: ax('2510.25122'), ref: 'arXiv 2510.25122',
      tldr: 'Drops the VLM. A frozen ResNet18 and a frozen text encoder run separately and meet only in a small ACT-style transformer, so the instruction embedding is computed once and cached. Adds long-short action chunking and a router that sends each task to the small or large variant.',
      f: [['Model', 'NanoVLA-S 161M (BERT-base text encoder), NanoVLA-L 520M (Qwen2.5-0.5B text encoder); 52M trainable in both. The routed variant is quoted at 296M, an invocation-weighted average.'],
          ['Recipe', 'Encoders frozen; the 52M fusion transformer and linear head are trained. L2 regression on action chunks with a KL term. Trained on 100-step chunks, executes 10 before replanning. Pretraining data, optimiser, learning rate and batch size are not reported.'],
          ['Compute', 'Not reported for the main results. 10k steps take 19–24 minutes on an RTX 3060. Inference on a Jetson Orin Nano (8 GB) at roughly 15–22 FPS, read from a plot.'],
          ['Results', 'LIBERO S 81.6 / 93.6 / 89.6 / 49.8, average 78.7; L 87.2 / 89.8 / 90.0 / 55.2, average 80.4; routed 84.1. LIBERO-90: S 55.1, L 83.3. Real SO-ARM101: S 79.5%, L 85.6%.'],
          ['Caveat', 'The router is fit on per-task success rates of S and L, and the paper does not say whether those come from the evaluation tasks. The four L suite numbers average 80.55, not the printed 80.4.']] },
    { id: 'llava-vla', name: 'LLaVA-VLA', title: 'Rethinking the Practicality of Vision-language-action Model: A Comprehensive Benchmark and An Improved Baseline', org: 'HKUST (Guangzhou), HUST, Westlake University, Zhejiang University', venue: 'preprint', url: ax('2602.22663'), ref: 'arXiv 2602.22663',
      tldr: 'Proposes a benchmark (CALVIN, a self-collected RoboTwin 2.0 set and real Cobot-Magic data) and distils eight design findings into a baseline: LLaVA-OneVision-0.5B with a merged two-view image, tokenised proprioception and discrete action tokens, with no robot-data pretraining.',
      f: [['Model', 'The 0.5B is the name of the backbone. No breakdown, vision-encoder size, frozen parts or trainable count are given. There is no action head; the LLM emits 256-bin action tokens.'],
          ['Recipe', 'Stage 1: multi-task post-training on in-domain data (1 epoch for CALVIN, 2 for RoboTwin). Stage 2: per-task fine-tuning for 8 epochs (RoboTwin and real robot only). Chunk of 5. Optimiser, learning rate and batch size not reported.'],
          ['Compute', 'Post-training on 8× H100 (about 6 hours for CALVIN); fine-tuning on one RTX 4090. Inference figures not reported.'],
          ['Results', 'CALVIN ABC→D 3.68. RoboTwin 2.0, 8 selected tasks: Seen 40.3, domain-randomized 28.6. Real fixed-base: Seen 44.2%, randomized 30.7%.'],
          ['Caveat', 'A second table gives 3.65 for the same model on CALVIN. The RoboTwin protocol (own demonstrations, 8 tasks, per-task fine-tuning) is not comparable to the standard benchmark.']] },
    { id: 'slim', name: 'SLIM', title: 'SLIM-0.5B: Learning Action-Grounded Predictive Latents for Robot Manipulation', org: 'Fudan University, BAAI, Tsinghua University, Renmin University', venue: 'preprint', url: ax('2608.09771'), ref: 'arXiv 2608.09771',
      tldr: 'A non-VLM policy: DINOv2-B plus a 16-layer two-stream transformer, with language injected by cross-attention from a frozen T5-small. Its new element is a first stage that jointly learns flow-matching inverse dynamics and prediction of future observation latents; the same backbone then becomes the policy.',
      f: [['Model', '472.14M trainable: DINOv2-B/14 86.58M, interaction trunk 377.96M, interfaces and heads 7.60M. The frozen T5-small is explicitly excluded and its size is not given.'],
          ['Recipe', 'No extra embodied pretraining, though stage 1 for LIBERO adds LIBERO-90. Stage 1: masked trajectory prediction, 3 epochs. Stage 2: flow-matching policy, 40 epochs, 4 sampling steps. AdamW, LR 1e-4 for the action model and 1e-5 for the encoder; batch 128 or 256. Chunk of 8 for LIBERO, 12 for CALVIN. One model for all four LIBERO suites.'],
          ['Compute', '8× H100 80 GB; hours not reported. Inference on an H100: 60.6 ms per call and 4.26 GiB peak, with language embeddings precomputed.'],
          ['Results', 'LIBERO 99.4 / 99.4 / 96.8 / 94.4, average 97.5. LIBERO-plus 77.45, zero-shot from the same checkpoint. CALVIN ABC→D 4.556. Real robot 67.8 average progress score, against 56.8 for π0.5.'],
          ['Caveat', 'No seeds or variance. On LIBERO-plus the robot-initial-state category is weak (36.90).']] },
    { id: 'swiftvla', name: 'SwiftVLA', title: 'SwiftVLA: Unlocking Spatiotemporal Dynamics for Lightweight VLA Models at Minimal Overhead', org: 'GigaAI, Peking University, Tsinghua University and others', venue: 'preprint', url: ax('2512.00903'), ref: 'arXiv 2512.00903',
      tldr: 'A SmolVLA-style model trained with extra 4D features from a frozen streaming geometry transformer. Learnable fusion tokens and a mask-and-reconstruct objective push that knowledge into the small model, so the 4D branch is dropped at inference.',
      f: [['Model', 'About 450M deployed: SmolVLM with 16 layers plus an action expert of about 100M. Keeping the 4D branch at inference makes it 1.65B. Which parts are frozen is not reported.'],
          ['Recipe', 'Pretrain on AgiBot World and RoboMIND in two stages: 100k steps action-only, then 50k steps with 4D inputs; batch 256, AdamW, LR 1e-4. Fine-tuning repeats the two stages. Diffusion noise-prediction loss plus reconstruction of masked 2D and 4D features and a future-trajectory loss. Denoising steps and chunk length not reported.'],
          ['Compute', 'Training hardware and time not reported. Inference on a Jetson Orin: 0.167 s and 1.4 GB, against 2.966 s and 16.2 GB for π0.'],
          ['Results', 'LIBERO 97.0 / 96.4 / 96.8 / 88.4, average 94.7 (95.1 with the 4D branch). RoboTwin 2.0, 6 selected tasks: 0.53. Real PiPER arm 0.80.'],
          ['Caveat', 'LIBERO trials, seeds and per-suite versus joint training are not stated. The like-for-like baseline is the authors retrained SmolVLA at 92.2.']] },
    { id: 'dynamicvla', name: 'DynamicVLA', title: 'DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation', org: 'S-Lab, Nanyang Technological University', venue: 'preprint; the PDF carries a NeurIPS 2026 footer', url: ax('2601.22153'), ref: 'arXiv 2601.22153',
      tldr: 'A compact VLA for grasping moving objects. It starts the next inference as soon as the previous one ends and drops the first actions of each chunk, whose time has already passed. Also introduces a dynamic-object benchmark with 200k synthetic and 2k real episodes.',
      f: [['Model', '430M: FastViT vision encoder, the first 16 layers of SmolLM2-360M and a 16-layer flow-matching action expert. No breakdown. Depth variants: 303M, 558M and 685M.'],
          ['Recipe', 'Three stages: image-text alignment on 150M COYO pairs (about 2 days), the full model on synthetic benchmark data (about 10 days), then real-robot demonstrations (about 2 days). Flow matching; chunk of 20 at 25 Hz. AdamW, LR 1e-4, batch 40 per GPU.'],
          ['Compute', '32× A100 for about two weeks. Inference 0.226 s per chunk and 1.8 GB on an RTX A6000.'],
          ['Results', '47.06% average on its own benchmark in simulation, against 13.61% for the best baseline. None of the seven table benchmarks is reported.']] },
    { id: 'dita', name: 'Dita', title: 'Dita: Scaling Diffusion Transformer for Generalist Vision-Language-Action Policy', org: 'Shanghai AI Lab, Zhejiang University, CUHK and others', venue: 'no venue stated in the PDF', url: ax('2503.19757'), ref: 'arXiv 2503.19757',
      tldr: 'Replaces the usual small diffusion head with one causal Transformer that denoises the whole action chunk in context, with the noised actions in the same sequence as language and image tokens.',
      f: [['Model', '334M total, 221M trainable. Frozen CLIP text encoder (included in the 334M), fine-tuned DINOv2, a Q-Former to 32 tokens per image, and a 12-layer, width-768 causal Transformer.'],
          ['Recipe', 'Pretrain on OXE: 100k steps, batch 8192, AdamW, LR 1e-4. Fine-tune per benchmark: LIBERO 100k steps at batch 512; CALVIN 15 epochs. DDPM noise prediction; 20 DDIM steps for zero-shot inference. Chunk of 16 in pretraining.'],
          ['Compute', 'Pretraining on 32× A100; LIBERO on 8× A100. Hours and VRAM not reported. The real robot runs at 3 Hz from an A100.'],
          ['Results', 'LIBERO 84.2 / 96.3 / 85.4 / 63.8, average 82.4 with a single third-person camera; 92.3 with a wrist camera. CALVIN ABC→D 3.61. SimplerEnv Google Robot: coke can 83.7, move near 76.0, drawer 46.3.'],
          ['Caveat', 'The wrist-camera row is not explained anywhere in the text. LIBERO trials per task are not stated.']] },
    { id: 'hypervla', name: 'HyperVLA', title: 'HyperVLA: Efficient Inference in Vision-Language-Action Models via Hypernetworks', org: 'University of Oxford', venue: 'preprint, under review', url: ax('2510.04898'), ref: 'arXiv 2510.04898',
      tldr: 'A hypernetwork reads the instruction and the first image once per episode and generates the weights of a tiny task-specific policy. Only a shared DINOv2 encoder and that 0.1M-parameter head run at each control step.',
      f: [['Model', 'Per step: 86M DINOv2 (fine-tuned) plus a 0.1M generated head. Once per episode: a 216M hypernetwork made of a frozen T5 (100M), a frozen DINOv2 (86M) and a 30M trained context encoder. About 302M in all.'],
          ['Recipe', 'Pretrain on OXE: 100k steps, batch 256, AdamW, peak LR 3e-4. Fine-tune on LIBERO: 10k steps for Spatial, Object and Goal; 60k for Long. MSE regression with a linear action head, one forward pass. Chunk of 4 with action ensembling.'],
          ['Compute', '4× A5000 for one day. Inference 4 ms per step on an L4, which excludes the once-per-episode hypernetwork pass.'],
          ['Results', 'LIBERO 95 / 94 / 92 / 74, average 89. SIMPLER zero-shot: Google Robot 63, WidowX 40.'],
          ['Caveat', 'The policy is fixed for the whole episode, so a changed instruction or scene needs the hypernetwork to run again.']] },
    { id: 'xs-vla', name: 'XS-VLA', title: 'XS-VLA: Teaching Tiny Vision-Language-Action Models with Spatial Supervision and Demonstration Conditioning', org: 'Tsinghua University, Beihang University, Wuxi Dexteroushands Robotic Technology', venue: 'preprint', url: ax('2607.04171'), ref: 'arXiv 2607.04171',
      tldr: 'A two-stage recipe on the SmolVLA architecture. Stage 1 teaches the backbone to name which of nine image regions holds the target object, with labels from a Qwen3-VL-4B teacher. Stage 2 adds an ACT-style latent over the action chunk and trains everything with a Huber flow-matching loss.',
      f: [['Model', '243.99M deployed: SmolVLM2-256M backbone with 16 layers plus the action expert. 244.83M during training; the extra posterior encoder is dropped. Nothing is frozen in stage 2.'],
          ['Recipe', 'No robot pretraining. Stage 1: 14k steps, batch 4, on 4,510 labelled LIBERO frames; cross-entropy on a 9-way region label. Stage 2: 160k steps, batch 32, AdamW, LR 1e-4 decaying to 2.5e-6 by step 30k. Huber flow matching plus a KL term; 10 Euler steps; chunk of 50 with 10 executed.'],
          ['Compute', 'LIBERO training hardware and time not reported; real-robot models on one RTX 3090. Inference 321 ms per 50-action chunk and 0.51 GiB on an RTX 3090.'],
          ['Results', 'LIBERO 93.0 / 91.0 / 88.0 / 89.0, average 90.3; a second seed gives the same total. Their own SmolVLA retrain scores 86.0. Mobile ALOHA, 3 tasks: 65.0% against 21.7%.'],
          ['Caveat', '10 episodes per task. The ablation gaps are 2 to 6 episodes, and the teacher labels were 72% correct in a human audit.']] },
    { id: 'vla-ad', name: 'VLA-AD', title: 'Offline Semantic Guidance for Efficient Vision-Language-Action Policy Distillation', org: 'University College London, University of Oxford', venue: 'preprint', url: ax('2605.16241'), ref: 'arXiv 2605.16241',
      tldr: 'Distils a large VLA teacher (OpenVLA-7B or π0.5) into a 158M Long-CLIP student with LoRA. Offline Qwen2.5-VL annotations are extra conditioning during training only; neither teacher nor annotator runs at test time.',
      f: [['Model', '158M total, 8.6M trainable. Long-CLIP encoder with rank-8 LoRA and an MLP head predicting a 5-step chunk. The Long-CLIP variant and the text pathway are not described.'],
          ['Recipe', 'No robot pretraining for the student; training data is the teacher successful rollouts in LIBERO (about 81,000 frames per suite). One training stage after offline annotation: cross-entropy on the teacher 256-bin action tokens, with a second image-only loss path. AdamW, 30 epochs, batch 32.'],
          ['Compute', 'About 22 GPU-hours per student, GPU not named; about 7 USD of annotation per suite. Inference 12.5 Hz on an RTX 4090.'],
          ['Results', 'LIBERO Object / Spatial / Goal only. π0.5 teacher: 96.5 / 93.0 / 94.0. OpenVLA teacher: 62.5 / 79.5 / 79.5. No LIBERO-Long.'],
          ['Caveat', '20 trials per task, one seed. The loss weight for the OpenVLA student is chosen per suite on the same evaluation trials.']] },
    { id: 'patch-policy', name: 'Patch Policy', title: 'Patch Policy: Efficient Embodied Control via Dense Visual Representations', org: 'New York University, Meta FAIR, AMI Labs', venue: 'preprint', url: ax('2607.18236'), ref: 'arXiv 2607.18236',
      tldr: 'Feeds all patch tokens of a frozen pretrained ViT, not a pooled vector, into a small transformer policy (VQ-BeT or Diffusion Policy) with attention that is full within a frame and causal across frames. No VLM, no language and no robot pretraining.',
      f: [['Model', 'VQ-BeT + DINOv2 ViT-S: 51.55M (29.49M trainable). VQ-BeT + WebSSL ViT-L: 334.00M (30.34M trainable). Diffusion Policy + DINOv2: 40.43M (9.19M trainable). Totals include the frozen encoder.'],
          ['Recipe', 'Policy trained from scratch per environment on its own demonstrations (500 for LIBERO-Goal); encoder frozen. VQ-BeT classification-plus-regression loss, or a denoising loss for the diffusion head. 224 px images, no proprioception. Optimiser, steps and denoising steps not reported.'],
          ['Compute', '6.5 hours on one L40S. Inference 10.99 ms (VQ-BeT + DINOv2) or about 446 ms (diffusion head) per forward pass.'],
          ['Results', 'LIBERO-Goal 0.96 (VQ-BeT) and 0.98 (diffusion) with DINOv2. Real Franka: cable insertion 0.70, pen collection 0.85, tool hanging 0.90, against 0.30 / 0.60 / 0.65 for OpenVLA-OFT.'],
          ['Caveat', 'LIBERO-Goal is run as a vision-only, goal-conditioned task with 10 trials per task and best-checkpoint selection, so it is not comparable to language-conditioned LIBERO.']] },
    { id: 'baku', name: 'BAKU', title: 'BAKU: An Efficient Transformer for Multi-Task Policy Learning', org: 'New York University', venue: 'preprint, July 2024', url: ax('2406.07539'), ref: 'arXiv 2406.07539',
      tldr: 'A roughly 10M multi-task behaviour-cloning transformer: FiLM-conditioned ResNet-18, a causal observation trunk with a learnable action token, and a swappable action head with chunking and temporal ensembling. The contribution is a systematic ablation of existing ideas.',
      f: [['Model', 'About 10M: sensory encoders 2.1M, observation trunk 6.5M, action head 1.4M. The MiniLM sentence encoder for the instruction is not in that count. Other sizes: 4.4M, 31M and 114M.'],
          ['Recipe', 'No pretraining; one stage of behaviour cloning per benchmark. MSE regression of a 10-step chunk as one vector, with temporal ensembling at every step. Adam, LR 1e-4, batch 64, 600k steps for LIBERO-90 and MetaWorld.'],
          ['Compute', 'One RTX A4000: about 10.5 hours for LIBERO, 8 hours for MetaWorld. Latency not reported; the real robot is driven at 10 Hz.'],
          ['Results', 'LIBERO-90 0.90, LIBERO-10 0.86. MetaWorld 0.79 on a custom subset. Real xArm, 30 tasks: 0.86 (0.91 with a VQ-BeT head).'],
          ['Caveat', '10 rollouts per task and no seeds. The 114M variant collapses to 0.19 on LIBERO-90.']] }
  ];
  document.getElementById('jump').innerHTML = papers.map(function (p) { return '<a href="#' + p.id + '">' + p.name + '</a>'; }).join('');
  document.getElementById('papers').innerHTML = papers.map(function (p) {
    return '<article class="paper" id="' + p.id + '"><h3>' + p.name + '</h3>' +
      '<div class="meta">' + p.title + '. ' + p.org + '. ' + p.venue + '. <a href="' + p.url + '" target="_blank" rel="noopener">' + p.ref + '</a></div>' +
      '<p class="tldr">' + p.tldr + '</p><dl>' +
      p.f.map(function (x) { return '<dt>' + x[0] + '</dt><dd' + (x[0] === 'Caveat' ? ' class="warn"' : '') + '>' + x[1] + '</dd>'; }).join('') + '</dl></article>';
  }).join('');

  // Click a model name in any table to open its paper notes in a dialog
  var dlg = document.createElement('dialog'); dlg.className = 'pdlg';
  dlg.innerHTML = '<div class="inner"><div class="bar"><button class="x" type="button">Close</button></div><div class="body"></div></div>';
  document.body.appendChild(dlg);
  function paperFor(label) {
    var best = null;
    papers.forEach(function (p) { if (label.indexOf(p.name) === 0 && (!best || p.name.length > best.name.length)) best = p; });
    return best;
  }
  function openPaper(id) {
    var src = document.getElementById(id); if (!src) return;
    var a = src.cloneNode(true); a.removeAttribute('id');
    var body = dlg.querySelector('.body'); body.innerHTML = ''; body.appendChild(a);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.querySelector('.inner').scrollTop = 0;
  }
  function closePaper() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  dlg.querySelector('.x').addEventListener('click', closePaper);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closePaper(); });
  Array.prototype.forEach.call(document.querySelectorAll('#main td.name, #arch td.name, #recipe td.name'), function (td) {
    var p = paperFor(td.textContent.trim()); if (!p) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'mlink'; b.textContent = td.textContent;
    b.setAttribute('aria-haspopup', 'dialog');
    b.addEventListener('click', function () { openPaper(p.id); });
    td.textContent = ''; td.appendChild(b);
  });

  // Chart: LIBERO average vs parameters (log scale)
  var pts = [ // name, params M, LIBERO, vlm, label dx, dy, anchor
    ['FLOWER', 947, 96.9, 1, 11, 6, 'start'],
    ['X-VLA', 900, 98.1, 1, 11, 5, 'start'],
    ['SimVLA', 800, 98.6, 1, 11, -4, 'start'],
    ['Evo-Depth', 900, 95.4, 1, 11, 2, 'start'],
    ['Evo-1', 770, 94.8, 1, 11, 11, 'start'],
    ['VLA-Adapter', 500, 97.3, 1, -9, 16, 'end'],
    ['SLIM', 472, 97.5, 0, -8, -9, 'end'],
    ['SwiftVLA', 450, 94.7, 1, -10, 4, 'end'],
    ['SmolVLA', 450, 87.3, 1, -10, 4, 'end'],
    ['NanoVLA-L', 520, 80.4, 0, 10, 4, 'start'],
    ['Dita', 334, 82.4, 0, -10, 4, 'end'],
    ['HyperVLA', 302, 89, 0, 10, 4, 'start'],
    ['XS-VLA', 244, 90.3, 1, -10, 4, 'end'],
    ['NanoVLA-S', 161, 78.7, 0, -10, 4, 'end'],
    ['TurboVLA', 216, 97.6, 0, -4, -11, 'end'],
    ['SUREFlow', 179, 92.5, 0, -10, 4, 'end'],
    ['CoRP', 48.9, 97.0, 0, 0, -11, 'middle'],
    ['MicroVLA', 12.4, 90.2, 0, 10, 4, 'start'],
    ['MINERVA-5M', 4.89, 97.15, 0, 0, -11, 'middle'],
    ['MINERVA-1M', 0.99, 96.75, 0, -10, -6, 'end'],
    ['MINERVA-0.5M', 0.54, 95.05, 0, 10, 4, 'start']
  ];
  var W = 760, H = 470, L = 46, R = 78, T = 18, B = 44;
  var x0 = Math.log10(0.3), x1 = Math.log10(2000), y0 = 78, y1 = 99.5;
  function X(v) { return L + (Math.log10(v) - x0) / (x1 - x0) * (W - L - R); }
  function Y(v) { return T + (y1 - v) / (y1 - y0) * (H - T - B); }
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Scatter plot of LIBERO average success against parameter count on a log scale. Values are in the comparison table below.">';
  [78, 82, 86, 90, 94, 98].forEach(function (v) {
    s += '<line class="' + (v === 78 ? 'base' : 'grid') + '" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/>' +
      '<text x="' + (L - 8) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + '</text>';
  });
  [[1, '1M'], [10, '10M'], [100, '100M'], [1000, '1B']].forEach(function (t) {
    s += '<line class="base" x1="' + X(t[0]) + '" x2="' + X(t[0]) + '" y1="' + Y(78) + '" y2="' + (Y(78) + 5) + '"/>' +
      '<text x="' + X(t[0]) + '" y="' + (Y(78) + 19) + '" text-anchor="middle">' + t[1] + '</text>';
  });
  s += '<text class="axis-title" x="' + ((L + W - R) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">Total parameters (log scale)</text>';
  s += '<text class="axis-title" x="' + L + '" y="11" text-anchor="start">LIBERO average success (%)</text>';
  pts.forEach(function (p, i) {
    var cx = X(p[1]), cy = Y(p[2]), col = p[3] ? 'var(--vlm)' : 'var(--novlm)';
    s += p[3] ? '<circle class="pt" cx="' + cx + '" cy="' + cy + '" r="6" fill="' + col + '"/>'
      : '<rect class="pt" x="' + (cx - 5.5) + '" y="' + (cy - 5.5) + '" width="11" height="11" fill="' + col + '" transform="rotate(45 ' + cx + ' ' + cy + ')"/>';
    s += '<text class="lbl" x="' + (cx + p[4]) + '" y="' + (cy + p[5]) + '" text-anchor="' + p[6] + '">' + p[0] + '</text>';
    s += '<circle class="hit" data-i="' + i + '" cx="' + cx + '" cy="' + cy + '" r="15" tabindex="0"/>';
  });
  s += '</svg><div class="tip" id="tip" hidden></div>';
  var chart = document.getElementById('chart'); chart.innerHTML = s;
  var tip = document.getElementById('tip');
  function show(e) {
    var p = pts[+e.target.getAttribute('data-i')], cr = chart.getBoundingClientRect(), r = e.target.getBoundingClientRect();
    tip.innerHTML = '<b>' + p[0] + '</b>' + p[1] + 'M parameters · LIBERO ' + p[2] + '<br>' + (p[3] ? 'VLM backbone' : 'No VLM');
    tip.hidden = false;
    var left = r.left - cr.left + chart.scrollLeft + r.width / 2 + 12, top = r.top - cr.top - 8;
    if (left + tip.offsetWidth > chart.scrollLeft + chart.clientWidth - 4) left = left - tip.offsetWidth - r.width - 12;
    tip.style.left = Math.max(4, left) + 'px'; tip.style.top = Math.max(4, top) + 'px';
  }
  function hide() { tip.hidden = true; }
  Array.prototype.forEach.call(chart.querySelectorAll('.hit'), function (el) {
    el.addEventListener('mouseenter', show); el.addEventListener('focus', show);
    el.addEventListener('mouseleave', hide); el.addEventListener('blur', hide);
  });
})();
