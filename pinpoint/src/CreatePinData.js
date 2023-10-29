function createPinData(pinId, title, description, coordinates, imageUrl, likes, postTime, popularity, categories, authorId) {
    return {
      pinId: pinId,
      geoJson: {
        type: "Feature",
        properties: {
          title: title,
          description: description
        },
        geometry: {
          coordinates: coordinates,
          type: "Point"
        }
      },
      imageUrl: imageUrl,
      likes: likes,
      postTime: postTime,
      popularity: popularity,
      categories: categories,
      authorId: authorId
    };
  }
  