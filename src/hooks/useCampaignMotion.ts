import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);

export function useCampaignMotion(reduced: boolean) {
  useLayoutEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ smoothWheel: true, anchors: true, duration: 1.05, prevent: node => !!node.closest('[data-lenis-prevent]') });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 900px)', () => {
      const hero = gsap.timeline({ scrollTrigger: { trigger: '.campaign-hero', start: 'top top', end: 'bottom top', scrub: true } });
      hero.to('.hero-title-first', { yPercent: -38, ease: 'none' }, 0)
        .to('.hero-title-last', { yPercent: -80, xPercent: 7, ease: 'none' }, 0)
        .to('.hero-portrait', { scale: 1.28, rotate: 4, yPercent: 14, ease: 'none' }, 0)
        .to('.hero-note', { yPercent: -90, ease: 'none' }, 0)
        .to('.hero-echo', { scale: .72, yPercent: -50, ease: 'none' }, 0);
      });

      gsap.from('.hero-title>span', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, stagger: .15, ease: 'power2.out' });
      gsap.utils.toArray<HTMLElement>('.collection-overlap, .human-reference').forEach(el => gsap.fromTo(el, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
      gsap.utils.toArray<HTMLElement>('.manifesto-word').forEach((word, i) => {
        gsap.fromTo(word, { opacity: .2, y: 26 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: `top+=${i * 55} 75%`, end: `top+=${i * 55 + 150} 60%`, scrub: true } });
      });
      gsap.fromTo('.manifesto-photo', { yPercent: 18, rotate: 10 }, { yPercent: -20, rotate: -7, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.art-bridge-copy', { y: 80 }, { y: -80, ease: 'none', scrollTrigger: { trigger: '.art-bridge', start: 'top bottom', end: 'bottom top', scrub: true } });

      mm.add('(min-width: 900px)', () => {
        const runway = document.querySelector<HTMLElement>('.runway');
        const track = document.querySelector<HTMLElement>('.runway-track');
        const concepts = document.querySelector<HTMLElement>('.concepts');
        if (!runway || !track || !concepts) return;
        runway.classList.add('is-horizontal'); concepts.classList.add('is-sequenced');
        const panels = gsap.utils.toArray<HTMLElement>('.look-panel');
        const travel = () => Math.max(0, track.scrollWidth - innerWidth);
        const movement = gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { id: 'runway', trigger: runway, start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true } });
        panels.forEach(panel => {
          gsap.fromTo(panel.querySelector('.look-photo'), { scale: 1.14, rotate: -3 }, { scale: 1, rotate: 2, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: movement, start: 'left right', end: 'right left', scrub: true } });
          gsap.fromTo(panel.querySelector('.look-caption'), { x: 65 }, { x: -35, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: movement, start: 'left right', end: 'right left', scrub: true } });
        });
        // Tabbing to an editorial must bring the corresponding horizontal panel into view.
        const focusPanel = (event: FocusEvent) => {
          const panel = (event.target as HTMLElement).closest<HTMLElement>('.look-panel');
          const st = movement.scrollTrigger;
          if (!panel || !st) return;
          const position = Math.min(travel(), Math.max(0, panel.offsetLeft - innerWidth * .08));
          if (Math.abs(-Number(gsap.getProperty(track, 'x')) - position) > innerWidth * .25) lenis.scrollTo(st.start + position, { immediate: true });
        };
        track.addEventListener('focusin', focusPanel);

        const frames = gsap.utils.toArray<HTMLElement>('.concept-frame');
        gsap.set(frames.slice(1), { autoAlpha: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        const sequence = gsap.timeline({ scrollTrigger: { trigger: concepts, start: 'top top', end: '+=260%', pin: true, scrub: true, anticipatePin: 1 } });
        frames.forEach((frame, i) => {
          if (i > 0) sequence.to(frame, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .55 }, i).to(frames[i - 1], { autoAlpha: 0, scale: .95, duration: .55 }, i);
          sequence.fromTo(frame.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: .9 }, i);
        });
        sequence.to({}, { duration: .45 });
        return () => { runway.classList.remove('is-horizontal'); concepts.classList.remove('is-sequenced'); track.removeEventListener('focusin', focusPanel); };
      });
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray<HTMLElement>('.concept-frame').forEach(frame => gsap.fromTo(frame.querySelector('img'), { scale: 1.07 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } }));
      });
      gsap.utils.toArray<HTMLElement>('.gallery-piece').forEach((piece, i) => {
        gsap.fromTo(piece, { y: i % 2 ? 70 : -35, rotationX: i % 2 ? 5 : -4 }, { y: i % 2 ? -80 : 70, rotationX: 0, ease: 'none', scrollTrigger: { trigger: '.art-gallery', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.ticker-track').forEach((track, i) => {
        const tween = gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 36, ease: 'none', repeat: -1 });
        ScrollTrigger.create({ trigger: '.type-interlude', start: 'top bottom', end: 'bottom top', onToggle: self => self.isActive ? tween.play() : tween.pause() });
      });
      mm.add('(hover: hover) and (pointer: fine)', () => {
        const cleanups: (() => void)[] = [];
        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
          const move = (event: PointerEvent) => { const rect = el.getBoundingClientRect(); gsap.to(el, { x: (event.clientX - rect.left - rect.width / 2) * .1, y: (event.clientY - rect.top - rect.height / 2) * .15, duration: .45, overwrite: 'auto' }); };
          const reset = () => gsap.to(el, { x: 0, y: 0, duration: .6, overwrite: 'auto' });
          el.addEventListener('pointermove', move); el.addEventListener('pointerleave', reset);
          cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); gsap.set(el, { clearProps: 'transform' }); });
        });
        document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(el => {
          const move = (event: PointerEvent) => { const r = el.getBoundingClientRect(); gsap.to(el, { rotationY: (event.clientX - r.left - r.width / 2) / r.width * 5, rotationX: -(event.clientY - r.top - r.height / 2) / r.height * 5, duration: .6, overwrite: 'auto' }); };
          const reset = () => gsap.to(el, { rotationX: 0, rotationY: 0, duration: .7, overwrite: 'auto' });
          el.addEventListener('pointermove', move); el.addEventListener('pointerleave', reset);
          cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); });
        });
        return () => cleanups.forEach(fn => fn());
      });
    });
    let alive = true;
    let refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    const refresh = () => { if (!alive) return; cancelAnimationFrame(refreshFrame); refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); };
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => { alive = false; cancelAnimationFrame(refreshFrame); window.removeEventListener('load', refresh); mm.revert(); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, [reduced]);
}
