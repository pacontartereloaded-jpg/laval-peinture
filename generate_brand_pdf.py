from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white

W, H = A4
MARGIN = 10 * mm

brands = [
    {
        'name': 'Peinture Laval',
        'website': 'peinturelaval.ca',
        'phone': '(450) 367-5637',
        'email': 'soumission@peinturelaval.ca',
        'card_bg': '#0C4A6E',
        'accent': '#0284C7',
        'front': 'E:/Laval Peinture/public/card-front.png',
        'back':  'E:/Laval Peinture/public/card-back.png',
        'colors': [
            {'hex': '#0C4A6E', 'name': 'Bleu Principal',  'role': 'Fond carte / Nav / Titres'},
            {'hex': '#0284C7', 'name': 'Bleu Secondaire', 'role': 'Boutons / Accents / CTA'},
            {'hex': '#075985', 'name': 'Bleu Moyen',      'role': 'Hover / Degrade'},
            {'hex': '#F0F9FF', 'name': 'Bleu Tres Clair', 'role': 'Fond page / Reverso'},
            {'hex': '#E0F2FE', 'name': 'Bleu Pale',       'role': 'Bordures / Cartes'},
            {'hex': '#FFFFFF', 'name': 'Blanc',           'role': 'Texte sur fond sombre'},
        ],
        'fonts': [
            {'name': 'Inter', 'weights': '400 · 600 · 700 · 900', 'use': 'Tout le texte — titres, contacts, UI'},
        ],
    },
    {
        'name': 'Peinture Repentigny',
        'website': 'peinturerepentigny.ca',
        'phone': '(450) 914-8104',
        'email': 'soumission@peinturerepentigny.ca',
        'card_bg': '#1A1A1A',
        'accent': '#8FB83A',
        'front': 'E:/Peinture Repentigny/public/card-front.png',
        'back':  'E:/Peinture Repentigny/public/card-back.png',
        'colors': [
            {'hex': '#8FB83A', 'name': 'Vert Lime',       'role': 'Accents / Titres / CTA'},
            {'hex': '#A8CC4E', 'name': 'Vert Lime Clair', 'role': 'Hover / Degrade'},
            {'hex': '#1A1A1A', 'name': 'Noir Profond',    'role': 'Fond carte / Texte'},
            {'hex': '#3A3A3A', 'name': 'Gris Fonce',      'role': 'Fond secondaire'},
            {'hex': '#F2F7E8', 'name': 'Vert Tres Clair', 'role': 'Fond reverso / Page'},
            {'hex': '#D4E8A0', 'name': 'Vert Pale',       'role': 'Bordures'},
        ],
        'fonts': [
            {'name': 'Inter', 'weights': '400 · 600 · 700 · 900', 'use': 'Tout le texte — titres, contacts, UI'},
        ],
    },
    {
        'name': 'Peinture Terrebonne',
        'website': 'peintureterrebonne.ca',
        'phone': '450-914-7542',
        'email': 'soumission@peintureterrebonne.ca',
        'card_bg': '#22120d',
        'accent': '#d99a2b',
        'front': 'E:/Peinture Terrebonne/public/card-front.png',
        'back':  'E:/Peinture Terrebonne/public/card-back.png',
        'colors': [
            {'hex': '#22120d', 'name': 'Brun Tres Fonce',  'role': 'Fond carte principal'},
            {'hex': '#7f321c', 'name': 'Rouge Fonce',      'role': 'Degrade / Accents'},
            {'hex': '#c65a2e', 'name': 'Rouge Terracotta', 'role': 'Couleur principale / CTA'},
            {'hex': '#d99a2b', 'name': 'Or / Dorado',      'role': 'Accent premium / Icones'},
            {'hex': '#fff8ee', 'name': 'Creme',            'role': 'Fond reverso / Page'},
            {'hex': '#eadfd5', 'name': 'Beige Clair',      'role': 'Bordures / Lignes'},
        ],
        'fonts': [
            {'name': 'Inter',   'weights': '400 · 600 · 700', 'use': 'Corps de texte, contacts, taglines'},
            {'name': 'Georgia', 'weights': '400 · 700',       'use': 'Logo / nom de marque sur la carte'},
        ],
    },
    {
        'name': 'Peinture Noza',
        'website': 'peinturenoza.com',
        'phone': '(514) 707-5444',
        'email': 'soumission@peinturenoza.com',
        'card_bg': '#0A0A0A',
        'accent': '#C9A96E',
        'front': 'E:/PEINTURE NOZA/card-front.png',
        'back':  'E:/PEINTURE NOZA/card-back.png',
        'colors': [
            {'hex': '#0A0A0A', 'name': 'Obsidian',   'role': 'Fond carte frente'},
            {'hex': '#111111', 'name': 'Charcoal',   'role': 'Fond carte reverso'},
            {'hex': '#C9A96E', 'name': 'Or Premium', 'role': 'Logo / Accents / Icones'},
            {'hex': '#E8D5A3', 'name': 'Or Clair',   'role': 'Hover / Degrade dore'},
            {'hex': '#F5F0E8', 'name': 'Creme',      'role': 'Fond page / Texte clair'},
            {'hex': '#D4CFC7', 'name': 'Creme Mute', 'role': 'Texte secondaire'},
        ],
        'fonts': [
            {'name': 'Playfair Display', 'weights': '400 · 600 · 700',      'use': 'Logo NOZA, titres luxe'},
            {'name': 'Inter',            'weights': '300 · 400 · 500 · 600', 'use': 'Corps, contacts, taglines'},
        ],
    },
]


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def is_dark(hex_color):
    r, g, b = hex_to_rgb(hex_color)
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140


def draw_rule(c, y, label, accent='#888888'):
    c.setFont('Helvetica-Bold', 8.5)
    c.setFillColor(HexColor(accent))
    c.drawString(MARGIN, y, label.upper())
    c.setStrokeColor(HexColor('#dddddd'))
    c.setLineWidth(0.6)
    c.line(MARGIN, y - 3, W - MARGIN, y - 3)


def draw_brand_page(c, brand):
    c.setFillColor(HexColor('#f7f7f7'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    y = H - 14 * mm

    # ── Header ──────────────────────────────────────────────
    HDR = 26 * mm
    c.setFillColor(HexColor(brand['card_bg']))
    c.roundRect(MARGIN, y - HDR, W - 2 * MARGIN, HDR, 7, fill=1, stroke=0)
    c.setFillColor(HexColor(brand['accent']))
    c.roundRect(MARGIN, y - HDR, 6, HDR, 3, fill=1, stroke=0)

    c.setFont('Helvetica-Bold', 19)
    c.setFillColor(white)
    c.drawString(MARGIN + 12 * mm, y - 10 * mm, brand['name'])
    c.setFont('Helvetica', 9)
    c.setFillColor(HexColor(brand['accent']))
    c.drawString(MARGIN + 12 * mm, y - 18 * mm, brand['website'] + '   |   ' + brand['phone'])

    y -= HDR + 8 * mm

    # ── Real card previews ───────────────────────────────────
    draw_rule(c, y, 'Tarjetas de Negocio (capturas reales)', brand['accent'])
    y -= 10 * mm

    # Fill page width minus margins: 2 cards + gap
    CARD_W = (W - 2 * MARGIN - 6 * mm) / 2   # ≈ 92 mm each
    CARD_H = CARD_W * (50.8 / 88.9)           # maintain 3.5" × 2" ratio ≈ 52.6 mm
    GAP = 6 * mm

    start_x = MARGIN

    # Front
    c.drawImage(brand['front'], start_x, y - CARD_H,
                width=CARD_W, height=CARD_H, preserveAspectRatio=False)
    c.setStrokeColor(HexColor('#cccccc'))
    c.setLineWidth(0.4)
    c.roundRect(start_x, y - CARD_H, CARD_W, CARD_H, 3, fill=0, stroke=1)
    c.setFont('Helvetica', 7.5)
    c.setFillColor(HexColor('#999999'))
    c.drawCentredString(start_x + CARD_W / 2, y - CARD_H - 5 * mm, 'FRENTE')

    # Back
    bx = start_x + CARD_W + GAP
    c.drawImage(brand['back'], bx, y - CARD_H,
                width=CARD_W, height=CARD_H, preserveAspectRatio=False)
    c.roundRect(bx, y - CARD_H, CARD_W, CARD_H, 3, fill=0, stroke=1)
    c.drawCentredString(bx + CARD_W / 2, y - CARD_H - 5 * mm, 'REVERSO')

    # Dimension annotation
    c.setStrokeColor(HexColor('#bbbbbb'))
    c.setLineWidth(0.4)
    ann_y = y - CARD_H - 10 * mm
    c.line(start_x, ann_y, start_x + CARD_W, ann_y)
    c.line(start_x, ann_y + 2, start_x, ann_y - 2)
    c.line(start_x + CARD_W, ann_y + 2, start_x + CARD_W, ann_y - 2)
    c.setFont('Helvetica', 7)
    c.setFillColor(HexColor('#bbbbbb'))
    c.drawCentredString(start_x + CARD_W / 2, ann_y - 4 * mm, '88.9 mm  ×  50.8 mm   (3.5" × 2")')

    y -= CARD_H + 22 * mm

    # ── Color palette ────────────────────────────────────────
    draw_rule(c, y, 'Palette de Couleurs', brand['accent'])
    y -= 11 * mm

    SW = (W - 2 * MARGIN - 5 * 4 * mm) / 6
    SH = 26 * mm

    for i, color in enumerate(brand['colors']):
        sx = MARGIN + i * (SW + 4 * mm)

        c.setFillColor(HexColor(color['hex']))
        c.roundRect(sx, y - SH, SW, SH, 5, fill=1, stroke=0)
        c.setStrokeColor(HexColor('#cccccc'))
        c.setLineWidth(0.4)
        c.roundRect(sx, y - SH, SW, SH, 5, fill=0, stroke=1)

        c.setFont('Helvetica-Bold', 6.5)
        tc = white if is_dark(color['hex']) else HexColor('#222222')
        c.setFillColor(tc)
        c.drawCentredString(sx + SW / 2, y - SH / 2 - 2.5, color['hex'])

        c.setFont('Helvetica-Bold', 7)
        c.setFillColor(HexColor('#333333'))
        words = color['name'].split()
        line1 = words[0]
        line2 = ' '.join(words[1:]) if len(words) > 1 else ''
        c.drawCentredString(sx + SW / 2, y - SH - 5 * mm, line1)
        if line2:
            c.drawCentredString(sx + SW / 2, y - SH - 8.5 * mm, line2)

        r, g, b = hex_to_rgb(color['hex'])
        c.setFont('Helvetica', 6)
        c.setFillColor(HexColor('#aaaaaa'))
        c.drawCentredString(sx + SW / 2, y - SH - 12 * mm, 'RGB %d %d %d' % (r, g, b))

    y -= SH + 22 * mm

    # ── Typography ───────────────────────────────────────────
    draw_rule(c, y, 'Typographie', brand['accent'])
    y -= 10 * mm

    FONT_ROW = 15 * mm
    for font in brand['fonts']:
        mid = y - FONT_ROW / 2

        c.setFillColor(HexColor(brand['accent']))
        c.circle(MARGIN + 2.5 * mm, mid + 1.5, 2.5, fill=1, stroke=0)

        c.setFont('Helvetica-Bold', 10)
        c.setFillColor(HexColor('#222222'))
        c.drawString(MARGIN + 7 * mm, mid + 4, font['name'])

        name_w = c.stringWidth(font['name'], 'Helvetica-Bold', 10)
        badge_x = MARGIN + 7 * mm + name_w + 4 * mm
        badge_w = c.stringWidth(font['weights'], 'Helvetica', 7) + 8
        c.setFillColor(HexColor('#e8e8e8'))
        c.roundRect(badge_x, mid - 0.5, badge_w, 10, 3, fill=1, stroke=0)
        c.setFont('Helvetica', 7)
        c.setFillColor(HexColor('#555555'))
        c.drawString(badge_x + 4, mid + 2.5, font['weights'])

        c.setFont('Helvetica', 8)
        c.setFillColor(HexColor('#888888'))
        c.drawString(MARGIN + 7 * mm, mid - 6, font['use'])

        y -= FONT_ROW

    y -= 8 * mm

    # ── Specs ────────────────────────────────────────────────
    draw_rule(c, y, 'Specifications Techniques', brand['accent'])
    y -= 8 * mm

    specs = [
        ('Format',           '88.9 mm × 50.8 mm  (3.5" × 2")'),
        ('Resolution',       '300 DPI minimum'),
        ('Zone de securite', '3 mm marge interieure'),
        ('Fond perdu',       '3 mm autour'),
        ('Fichier',          'PDF vectoriel ou PNG 300 DPI'),
        ('Finition',         'Pelliculage mat recommande'),
    ]
    col2_x = MARGIN + (W - 2 * MARGIN) / 2 + 5 * mm
    for i, (label, val) in enumerate(specs):
        col = i % 2
        row = i // 2
        lx = MARGIN + 2 * mm if col == 0 else col2_x
        ly = y - row * 6.5 * mm
        c.setFont('Helvetica-Bold', 8)
        c.setFillColor(HexColor('#444444'))
        c.drawString(lx, ly, label + ':')
        c.setFont('Helvetica', 8)
        c.setFillColor(HexColor('#666666'))
        c.drawString(lx + 36 * mm, ly, val)

    # ── Footer ───────────────────────────────────────────────
    c.setStrokeColor(HexColor('#dddddd'))
    c.setLineWidth(0.5)
    c.line(MARGIN, 14 * mm, W - MARGIN, 14 * mm)
    c.setFont('Helvetica', 7)
    c.setFillColor(HexColor('#bbbbbb'))
    c.drawCentredString(W / 2, 10 * mm,
                        brand['name'] + '  |  ' + brand['website'] + '  |  Palette de marque officielle')


c = canvas.Canvas('E:/Laval Peinture/public/brand-colors-v3.pdf', pagesize=A4)
c.setTitle('Palettes de Couleurs — Peinture Laval / Repentigny / Terrebonne / Noza')

for brand in brands:
    draw_brand_page(c, brand)
    c.showPage()

c.save()
print('PDF listo: E:/Laval Peinture/public/brand-colors-v3.pdf')
