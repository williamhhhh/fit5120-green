from app import db

def calculate_green_score(lng, lat):
    conn = db.get_db_connection()
    cursor = conn.cursor()
    print(f"Calculating green score for coordinates: ({lng}, {lat})")

    sql = """
    WITH buffer AS (
        SELECT ST_Buffer(ST_SetSRID(ST_Point(%s, %s), 4326)::geography, 300)::geometry AS geom
    ),
    intersected AS (
        SELECT ST_Intersection(c.wkb_geometry, b.geom) AS geom
        FROM "green-city".treecanopy c, buffer b
        WHERE ST_Intersects(c.wkb_geometry, b.geom)
    )
    SELECT 
        ST_Area(ST_Union(i.geom)::geography) AS canopy_area,
        ST_Area((SELECT geom FROM buffer)::geography) AS buffer_area
    FROM intersected i, buffer b;
    """

    cursor.execute(sql, (lng, lat))
    result = cursor.fetchone()

    canopy_area, buffer_area = result if result else (0, 1)
    print(f"Canopy Area: {canopy_area}, Buffer Area: {buffer_area}")

    score = round((canopy_area / buffer_area) * 100)
    return score