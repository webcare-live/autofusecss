Columns (CSS Columns)

Utilities
- `.af-columns-{1..6}`: set CSS column-count
- `.af-column-gap-{n}`: gap based on spacing scale
- `.af-break-inside-avoid`: prevent column breaks for an element

Example

```
<div class="af-columns-3 af-column-gap-4">
  <p>…</p>
  <p class="af-break-inside-avoid">Keep me intact.</p>
</div>
```

Note: Grid utilities live under Grids.
