
import { Router } from "express";
import Course from "../models/Course.js";

const router = Router();


router.get("/", async (req, res) => {
    console.log(`this one`);
    return res.status(200).json({ message: "Hello from course route!" });
});

router.get("/:slug", async (req, res) => {
    console.log("Course Routes Loaded");
  try {
    
    console.log("Slug received from URL →", req.params.slug);

    // Print all slugs in DB
    const allCourses = await Course.find({}, { slug: 1, _id: 0 });
    console.log("All slugs in DB →", allCourses);

    
    // console.log("slug RECEIVED:", req.params.slug, req.body.slug, req.query.slug);

    const course = await Course.findOne({ slug: req.params.slug });
    
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;
