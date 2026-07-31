#!/usr/bin/env python3
"""
RaRa In The Kitchen — PDF Menu Generator Script
Generates assets/menu/menu.pdf from the menu data model using ReportLab.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, Image
)

# Colors matching the brand palette
COLOR_NOIR = colors.HexColor("#0B0B0C")
COLOR_NOIR_RAISED = colors.HexColor("#161214")
COLOR_BLUSH = colors.HexColor("#EC1876")
COLOR_GILT = colors.HexColor("#C89B3C")
COLOR_CREAM = colors.HexColor("#F7F1E8")
COLOR_COCOA = colors.HexColor("#2A1B12")
COLOR_WHISPER = colors.HexColor("#7A6F66")

# Data model synchronized with js/menu-data.js
MENU_DATA = [
    {
        "category": "Showcase Specials (Couture & Custom Cakes)",
        "items": [
            ("Executive Chocolate Cake", "Custom Size", "Price on Order", "Luxurious dark chocolate cake decorated with hand-crafted chocolate shards & gold accents."),
            ("Executive Vanilla Cake", "Custom Size", "Price on Order", "Refined vanilla bean sponge enveloped in silky white buttercream and gold leaf detailing."),
            ("Edible Picture Chocolate / Vanilla", "Custom Size", "Price on Order", "High-definition edible photo print on rich chocolate or vanilla sponge."),
            ("Floral Couture Chocolate / Vanilla", "Custom Size", "Price on Order", "Topped with handcrafted buttercream flowers and fresh edible blossoms."),
            ("Ferrero Rocher Deluxe Cake", "Custom Size", "Price on Order", "Loaded with crushed Ferrero Rocher, Nutella cream, and roasted hazelnut crunch."),
            ("Nutella Supreme & Overload Cakes", "Custom Size", "Price on Order", "Rich cocoa layers filled with smooth Italian Nutella and ganache drips."),
            ("Mega Chocolate Attack & Choice Overload", "Custom Size", "Price on Order", "Ultimate showstopper stacked with truffles, brownies, KitKats & candies.")
        ]
    },
    {
        "category": "1 kg Signature Cakes",
        "items": [
            ("Signature Chocolate Cake", "1 kg", "KES 2,500", "RITK's classic — rich, moist chocolate layers with silky chocolate buttercream."),
            ("Signature Vanilla Cake", "1 kg", "KES 2,900", "Light and airy vanilla bean sponge with smooth Madagascar vanilla buttercream."),
            ("Red Velvet & Cream Cheese Cake", "1 kg", "KES 3,700", "Deep crimson cocoa sponge layered with authentic, tangy cream cheese frosting."),
            ("Fresh Fruit Cake (Strawberries & Mixed Fruit)", "1 kg", "KES 4,600", "Delicate sponge frosted in light whipped cream, topped lavishly with fresh fruits."),
            ("Mango & Cream Cake", "1 kg", "KES 3,500", "Fluffy sponge layered with fresh Mombasa sweet mango slices and vanilla cream."),
            ("Oreo Cake (White or Black Base)", "1 kg", "Price on Order", "Buttercream dotted with crushed Oreo cookies and chocolate biscuits."),
            ("Very Berry & Strawberry Cream Sponge", "1 kg", "Price on Order", "Infused with berry compote, fresh strawberries, and fluffy cream."),
            ("Lemon Meringue & Black / White Forest", "1 kg", "Price on Order", "Zesty lemon curd, cherries, and toasted swiss meringue or dark chocolate."),
            ("Lotus Biscoff & Chocolate Fudge Cakes", "1 kg", "Price on Order", "Speculoos cookie butter frosting, lotus crumble, and warm fudge coating."),
            ("Vanilla / Chocolate Dream & Coffee Espresso", "1 kg", "Price on Order", "Silky mousse layers, espresso infusion, and cocoa dusting."),
            ("Salted Caramel & Artisanal Banana Bread", "1 kg", "Price on Order", "Butterscotch sponge with house-made caramel or spiced banana loaf with walnuts.")
        ]
    },
    {
        "category": "Cupcakes (12 pcs per box)",
        "items": [
            ("Signature Vanilla Cupcakes", "12 pcs/box", "KES 1,900", "Soft, fluffy vanilla cupcakes topped with silky piped vanilla buttercream."),
            ("Signature Chocolate Cupcakes", "12 pcs/box", "Price on Order", "Moist cocoa cupcakes topped with rich chocolate swirl frosting."),
            ("Lotus Biscoff Cupcakes", "12 pcs/box", "Price on Order", "Biscoff-infused cupcakes topped with lotus cookie butter swirl."),
            ("Oreo & Marble Twist Cupcakes", "12 pcs/box", "Price on Order", "Cookies-and-cream icing or dual-tone swirled buttercream."),
            ("Berry Goodness & Lemon Meringue", "12 pcs/box", "Price on Order", "Filled with fruit compote or tangy lemon curd with toasted meringue."),
            ("Couture Floral & Red Velvet Cupcakes", "12 pcs/box", "Price on Order", "Intricately piped buttercream flowers or red velvet with cream cheese."),
            ("Customized Fondant & Celebration Cupcakes", "12 pcs/box", "Price on Order", "Personalized custom fondant toppers for birthdays and special events.")
        ]
    },
    {
        "category": "Cookies, Brownies, Treats & Shots",
        "items": [
            ("Chocolate-Dipped & Chocolate Chip Cookies", "Per Box", "Price on Order", "Crisp butter cookies dipped in Belgian dark chocolate or semi-sweet chips."),
            ("Lotus Biscoff & Red Velvet Cookies", "Per Box", "Price on Order", "Speculoos cookies stuffed with biscoff spread or white chocolate chunks."),
            ("Ooey Gooey Brownies", "Per Box", "Price on Order", "Fudgy dark chocolate brownies with crinkly tops and molten centers."),
            ("French Choux Éclairs & Cocoa Bombs", "Per Box", "Price on Order", "Choux pastry filled with vanilla bean pastry cream or hot cocoa spheres."),
            ("Gourmet Dessert Shots", "18 pcs/box", "Price on Order", "Shot glasses layering mousse, cheesecake, berry compote & crumbles."),
            ("Lotus, Berry & Ferrero Cheesecakes", "Whole/Slice", "Price on Order", "Rich unbaked biscoff or baked berry swirl and hazelnut cheesecakes.")
        ]
    }
]

def generate_pdf():
    output_path = os.path.join(r"c:\Users\ADMIN\Desktop\CLOSET\Antigravity\rara in the kitchen", "assets", "menu", "menu.pdf")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_GILT,
        alignment=1 # Center
    )

    tagline_style = ParagraphStyle(
        'Tagline',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=14,
        textColor=COLOR_BLUSH,
        alignment=1,
        spaceAfter=15
    )

    contact_header_style = ParagraphStyle(
        'ContactHeader',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=COLOR_COCOA,
        alignment=1,
        spaceAfter=15
    )

    cat_header_style = ParagraphStyle(
        'CatHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=COLOR_BLUSH,
        spaceBefore=12,
        spaceAfter=6
    )

    item_name_style = ParagraphStyle(
        'ItemName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=COLOR_COCOA
    )

    item_desc_style = ParagraphStyle(
        'ItemDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=COLOR_WHISPER
    )

    price_style = ParagraphStyle(
        'ItemPrice',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=COLOR_GILT,
        alignment=2 # Right
    )

    unit_style = ParagraphStyle(
        'ItemUnit',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=COLOR_WHISPER,
        alignment=2
    )

    footer_style = ParagraphStyle(
        'FooterNote',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=COLOR_WHISPER,
        alignment=1,
        spaceBefore=15
    )

    story = []

    # Logo & Title Banner
    logo_path = os.path.join(r"c:\Users\ADMIN\Desktop\CLOSET\Antigravity\rara in the kitchen", "assets", "images", "logo", "logo.png")
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=1.1*inch, height=1.1*inch)
        logo_img.hAlign = 'CENTER'
        story.append(logo_img)
        story.append(Spacer(1, 6))

    story.append(Paragraph("<b>RaRa In The Kitchen</b>", title_style))
    story.append(Paragraph("<i>\"You've tried the REST, Now try the BEST!\"</i>", tagline_style))
    story.append(Paragraph("<b>WhatsApp Orders:</b> +254 753 111 111 &nbsp;|&nbsp; <b>Instagram:</b> @rarainthekitchen &nbsp;|&nbsp; <b>Location:</b> Nyali, Mombasa", contact_header_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_GILT, spaceAfter=15))

    # Render Categories
    for cat in MENU_DATA:
        category_elements = []
        category_elements.append(Paragraph(f"<b>{cat['category']}</b>", cat_header_style))

        table_data = []
        for name, unit, price, desc in cat['items']:
            left_col = [
                Paragraph(f"<b>{name}</b>", item_name_style),
                Paragraph(desc, item_desc_style)
            ]
            right_col = [
                Paragraph(f"<b>{price}</b>", price_style),
                Paragraph(unit, unit_style)
            ]
            table_data.append([left_col, right_col])

        t = Table(table_data, colWidths=[400, 140])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#EAE2D8"))
        ]))
        
        category_elements.append(t)
        category_elements.append(Spacer(1, 10))
        story.append(KeepTogether(category_elements))

    # Footer
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_GILT, spaceAfter=10))
    story.append(Paragraph("<b>RARA École de Pâtisserie</b> — Professional Baking & Decorating School in Nyali, Mombasa.<br/>Saturday Bake Classes for Kids/Teens & 5-Week Certificate Courses available.", footer_style))

    doc.build(story)
    print("Successfully generated PDF menu at:", output_path)

if __name__ == "__main__":
    generate_pdf()
