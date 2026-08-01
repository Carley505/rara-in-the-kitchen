import os
import json
import re
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas

# Define Palette Matching Option 1 Warm French Boutique
COLOR_CREAM = colors.HexColor('#FAF6F0')
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_COCOA = colors.HexColor('#2D1F24')
COLOR_WHISPER = colors.HexColor('#4A3A34')
COLOR_BURGUNDY = colors.HexColor('#8C1D40')
COLOR_GOLD = colors.HexColor('#9E7724')
COLOR_BORDER = colors.HexColor('#E6D7C3')

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically add page numbers and header/footer borders."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        width, height = letter

        # Skip header/footer decorations on cover page (page 1)
        if self._pageNumber > 1:
            # Top Gold Accent Line
            self.setStrokeColor(COLOR_GOLD)
            self.setLineWidth(1)
            self.line(36, height - 36, width - 36, height - 36)

            # Running Header
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_BURGUNDY)
            self.drawString(36, height - 28, "RARA IN THE KITCHEN  •  BOUTIQUE PÂTISSERIE")
            
            self.setFont("Helvetica", 8)
            self.setFillColor(COLOR_WHISPER)
            self.drawRightString(width - 36, height - 28, "Nyali, Mombasa  |  +254 753 111 111")

            # Bottom Gold Accent Line
            self.line(36, 42, width - 36, 42)

            # Running Footer
            self.setFont("Helvetica", 8)
            self.setFillColor(COLOR_WHISPER)
            self.drawString(36, 28, "Saturday – Thursday: 09:00 AM – 21:00 PM  |  orders@rarainthekitchen.co.ke")
            page_text = f"Page {self._pageNumber} of {page_count}"
            self.drawRightString(width - 36, 28, page_text)

        self.restoreState()

def build_pdf():
    pdf_filename = r"c:\Users\ADMIN\Desktop\CLOSET\Antigravity\rara in the kitchen\assets\menu\menu.pdf"
    os.makedirs(os.path.dirname(pdf_filename), exist_ok=True)

    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=48,
        bottomMargin=48
    )

    styles = getSampleStyleSheet()

    # Custom Paragraph Styles
    style_cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=38,
        textColor=COLOR_COCOA,
        alignment=1,
        spaceAfter=8
    )

    style_cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=COLOR_BURGUNDY,
        alignment=1,
        spaceAfter=15
    )

    style_cover_slogan = ParagraphStyle(
        'CoverSlogan',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=13,
        leading=18,
        textColor=COLOR_GOLD,
        alignment=1,
        spaceAfter=25
    )

    style_cat_title = ParagraphStyle(
        'CategoryTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=COLOR_BURGUNDY,
        spaceBefore=14,
        spaceAfter=4,
        keepWithNext=True
    )

    style_cat_sub = ParagraphStyle(
        'CategorySub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=COLOR_WHISPER,
        spaceAfter=8,
        keepWithNext=True
    )

    style_item_name = ParagraphStyle(
        'ItemName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=COLOR_COCOA
    )

    style_item_desc = ParagraphStyle(
        'ItemDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=COLOR_WHISPER
    )

    style_item_price = ParagraphStyle(
        'ItemPrice',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=COLOR_GOLD,
        alignment=2
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 40))
    
    cover_header_data = [
        [Paragraph("<font color='#8C1D40'>✦</font> MOMBASA'S FAVORITE LUXURY PATISSERIE <font color='#8C1D40'>✦</font>", ParagraphStyle('Meta', fontName='Helvetica-Bold', fontSize=9, textColor=COLOR_GOLD, alignment=1))],
        [Spacer(1, 15)],
        [Paragraph("RaRa In The Kitchen", style_cover_title)],
        [Paragraph("BOUTIQUE PÂTISSERIE & RARA ÉCOLE DE PÂTISSERIE", style_cover_subtitle)],
        [Paragraph("<i>\"You've tried the REST, Now try the BEST!\"</i>", style_cover_slogan)],
        [HRFlowable(width="60%", thickness=1.5, color=COLOR_GOLD, spaceBefore=10, spaceAfter=20)],
        [Paragraph("<b>OFFICIAL MENU & PRICE LIST</b>", ParagraphStyle('Sub', fontName='Helvetica-Bold', fontSize=14, textColor=COLOR_COCOA, alignment=1, spaceAfter=15))],
        [Paragraph("Nyali, Mombasa, Kenya  •  Saturday – Thursday: 09:00 – 21:00<br/>Direct Orders & WhatsApp: <b>+254 753 111 111</b>", ParagraphStyle('Info', fontName='Helvetica', fontSize=10, leading=14, textColor=COLOR_WHISPER, alignment=1))]
    ]
    
    cover_table = Table(cover_header_data, colWidths=[540])
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CREAM),
        ('BOX', (0,0), (-1,-1), 1.5, COLOR_GOLD),
        ('INNERGRID', (0,0), (-1,-1), 0, COLOR_WHITE),
        ('TOPPADDING', (0,0), (-1,-1), 25),
        ('BOTTOMPADDING', (0,0), (-1,-1), 25),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
    ]))
    
    story.append(cover_table)
    story.append(PageBreak())

    # Load Data from js/menu-data.js
    with open(r"c:\Users\ADMIN\Desktop\CLOSET\Antigravity\rara in the kitchen\js\menu-data.js", "r", encoding="utf-8") as f:
        js_content = f.read()

    categories = [
        ('specials', 'Couture & Custom Specials', 'Bespoke showpieces & handcrafted custom cakes for special celebrations'),
        ('cakes-1kg', 'Artisanal 1kg Layer Cakes', 'Mombasa’s finest moist layer cakes baked fresh daily with premium ingredients'),
        ('cupcakes', 'Signature Cupcake Boxes', 'Piped buttercream cupcakes available in boxes of 12 pcs'),
        ('cookies-treats', 'Cookies, Brownies, Dessert Shots & Cheesecakes', 'Decadent baked confections, shot glass desserts, and creamy cheesecakes')
    ]

    def get_attr(block, attr):
        m = re.search(r'' + attr + r'\s*:\s*([^\n,]+)', block)
        if m:
            val = m.group(1).strip().strip("'\"")
            if val == 'null':
                return None
            return val
        return None

    item_blocks = re.findall(r'\{\s*id:[^{}]+\}', js_content)
    parsed_items = []
    for b in item_blocks:
        item_id = get_attr(b, 'id')
        category = get_attr(b, 'category')
        name = get_attr(b, 'name')
        price_str = get_attr(b, 'price')
        unit = get_attr(b, 'unit')
        desc = get_attr(b, 'desc')
        badge = get_attr(b, 'badge')
        
        price = int(price_str) if price_str and price_str.isdigit() else None
        parsed_items.append({
            'id': item_id,
            'category': category,
            'name': name,
            'price': price,
            'unit': unit,
            'desc': desc,
            'badge': badge
        })

    # Render Category Sections
    for cat_id, cat_title, cat_sub in categories:
        cat_items = [i for i in parsed_items if i['category'] == cat_id]
        if not cat_items:
            continue

        story.append(Paragraph(cat_title, style_cat_title))
        story.append(Paragraph(cat_sub, style_cat_sub))
        story.append(HRFlowable(width="100%", thickness=1, color=COLOR_GOLD, spaceBefore=2, spaceAfter=6))

        table_data = []
        for i in range(0, len(cat_items), 2):
            row = []
            # Left item
            item1 = cat_items[i]
            p1_str = f"KES {item1['price']:,}" if item1['price'] else "Custom Quote"
            u1_str = f" ({item1['unit']})" if item1['unit'] else ""
            badge1 = f" <font color='#8C1D40'>[<b>{item1['badge']}</b>]</font>" if item1['badge'] else ""
            
            cell1 = [
                Paragraph(f"{item1['name']}{badge1}", style_item_name),
                Paragraph(item1['desc'], style_item_desc),
                Paragraph(f"<b>{p1_str}</b>{u1_str}", style_item_price),
                Spacer(1, 3)
            ]
            row.append(cell1)

            # Right item (if exists)
            if i + 1 < len(cat_items):
                item2 = cat_items[i + 1]
                p2_str = f"KES {item2['price']:,}" if item2['price'] else "Custom Quote"
                u2_str = f" ({item2['unit']})" if item2['unit'] else ""
                badge2 = f" <font color='#8C1D40'>[<b>{item2['badge']}</b>]</font>" if item2['badge'] else ""

                cell2 = [
                    Paragraph(f"{item2['name']}{badge2}", style_item_name),
                    Paragraph(item2['desc'], style_item_desc),
                    Paragraph(f"<b>{p2_str}</b>{u2_str}", style_item_price),
                    Spacer(1, 3)
                ]
                row.append(cell2)
            else:
                row.append([Paragraph("", style_item_name)])

            table_data.append(row)

        menu_table = Table(table_data, colWidths=[262, 262])
        menu_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 4),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor('#F2E8DC')),
        ]))

        story.append(menu_table)
        story.append(Spacer(1, 8))

    # Ordering & Contact Info Box at end
    story.append(Spacer(1, 8))
    info_box_data = [
        [Paragraph("<b>HOW TO PLACE YOUR ORDER & PICKUP DETAILS</b>", ParagraphStyle('BoxHead', fontName='Helvetica-Bold', fontSize=10.5, textColor=COLOR_BURGUNDY, alignment=1))],
        [Paragraph("<b>WhatsApp Orders:</b> +254 753 111 111  |  <b>Location:</b> Nyali, Mombasa, Kenya<br/>"
                   "<b>Opening Hours:</b> Saturday – Thursday, 09:00 AM – 21:00 PM<br/>"
                   "<i>Custom cake pre-orders are recommended at least 24–48 hours in advance. Pickup & Mombasa delivery available.</i>",
                   ParagraphStyle('BoxBody', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=COLOR_COCOA, alignment=1))]
    ]
    info_table = Table(info_box_data, colWidths=[540])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CREAM),
        ('BOX', (0,0), (-1,-1), 1, COLOR_GOLD),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(info_table)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated luxury PDF menu at: {pdf_filename}")

if __name__ == "__main__":
    build_pdf()
